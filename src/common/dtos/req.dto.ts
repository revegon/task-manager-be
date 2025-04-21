import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class RequestDto {}

export class SearchDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  size?: number = 10;
}
