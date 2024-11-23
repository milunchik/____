import { IsEmail, IsString } from 'class-validator';

export class resetPasswordDTO {
  @IsEmail()
  email?: string;

  @IsString()
  password?: string;
}
