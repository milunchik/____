import { IsEmail, IsNumber, IsString, Max, Min } from 'class-validator';

export class QuestionaryCreateDTO {
  @IsString()
  fullname: string;

  @IsString()
  @Max(11)
  @Min(9)
  phone_number: string;

  @IsEmail()
  email: string;

  @IsNumber()
  age: number;

  @IsString()
  teacher: string;

  @IsString()
  subject: string;

  @IsString()
  description?: string;
}
