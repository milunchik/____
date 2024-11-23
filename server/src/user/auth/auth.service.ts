import { Injectable, NotFoundException, Body } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { UserService } from '../user.service';
import {
  hashPassword,
  validatePassword,
} from '../../middleware/password-hash.middleware';
import { CustomMailerService } from 'src/mail/mail.service';
import { resetPasswordDTO } from '../dtos/reset-password.dto';
import { randomBytes } from 'node:crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private mailService: CustomMailerService,
  ) {}

  async signup(email: string, password: string, role: string) {
    const users = await this.usersService.findByEmail(email);

    if (users) {
      throw new BadRequestException('Email already exist!');
    }

    const hashedPassword = await hashPassword(password);
    const user = await this.usersService.create(
      email,
      hashedPassword.toString(),
      role,
    );
    await this.mailService.sendWelcomeEmail(user.email.toString());
    return user._id;
  }

  async signin(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userPassword: string = user.password.toString();
    const isMatch = validatePassword(password, userPassword);

    if (isMatch) {
      this.mailService.sendSignalEmail(user.email.toString());
      return user;
    }
  }

  async getUser(userId: string) {
    if (!userId) {
      throw new NotFoundException('User not found');
    }
    return this.usersService.findOne(userId);
  }

  async resetPassword(@Body() body: resetPasswordDTO) {
    const user = await this.usersService.findByEmail(body.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const resetToken = randomBytes(32).toString('hex');

    user.resetToken = resetToken;
    user.resetTokenExpiration = new Date(Date.now() + 3600000);
    await user.save();

    await this.mailService.sendReset(body.email, resetToken);
  }

  async changePassword(token: string, password: string) {
    const user = await this.usersService.findByToken(token);

    if (!user) {
      throw new NotFoundException('Invalid token');
    }

    const hashedPassword = await hashPassword(password);

    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiration = null;
    await user.save();
  }
}
