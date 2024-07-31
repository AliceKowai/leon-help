import { IsString, IsDate, IsInt, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { Level } from '@prisma/client';

export class CreateServiceDto {
  @IsEnum(Level)
  level: Level;

  @IsString()
  description: string;

  @IsInt()
  technician_registration: number;

  @IsInt()
  call_id: number;
}
