import { IsNumber, IsOptional, IsPostalCode } from 'class-validator';

export class PaginationDTO {
  @IsNumber()
  @IsPostalCode()
  @IsOptional()
  skip: number;

  @IsNumber()
  @IsPostalCode()
  @IsOptional()
  limit: number;
}
