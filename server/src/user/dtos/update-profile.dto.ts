import {
  IsEmail,
  IsOptional,
  IsString,
  Min,
  Max,
  IsNumber,
} from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Min(6)
  password?: string;

  @IsOptional()
  @IsString()
  fullname?: string;

  @IsOptional()
  @IsString()
  @Min(9)
  @Max(11)
  phone_number?: string;

  @IsOptional()
  @IsString()
  experience: string;

  @IsOptional()
  @IsString()
  lessons: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  image: string;
}
