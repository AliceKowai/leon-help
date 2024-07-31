import { IsInt, IsString, IsOptional, IsEnum, IsDate, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';
import { Level,UsersType, Specialty } from '@prisma/client';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  user_name: string;

  @IsString()
  password: string;

  @IsString()
  sector: string;

  @IsString()
  @IsEnum(UsersType)
  type: UsersType;

  @IsOptional()
  @IsEnum(Level)
  level?: Level;

  @IsOptional()
  @IsEnum(Specialty)
  specialty?: Specialty;

  @IsString()
  ext: string;
}
