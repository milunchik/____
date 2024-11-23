import { BadRequestException } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'node:crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);
export class ValitaionForPasssword {}

export const hashPassword = async (password) => {
  const salt = randomBytes(8).toString('hex');
  const hash = (await scrypt(password, salt, 32)) as Buffer;

  const hashedPassword = `${salt}.${hash.toString('hex')}`;
  return hashedPassword;
};

export const validatePassword = async (
  password: string,
  userPassword: string,
) => {
  const [salt, storedHash] = userPassword.split('.');
  const hashedPassword = (await scrypt(password, salt, 32)) as Buffer;

  if (storedHash !== hashedPassword.toString('hex')) {
    throw new BadRequestException('Invalid password');
  }
  return true;
};
