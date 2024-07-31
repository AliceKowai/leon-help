import { IsString, IsEnum, IsBoolean, IsOptional, IsDate, IsInt } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Specialty, Priority} from '@prisma/client';

enum CallStatus {
  ABERTA = 'aberta',
  FECHADA = 'fechada',
  EM_ANDAMENTO = 'em andamento',
}


class CreateCallUserDto {
  @IsInt()
  user_registration: number;
}

export class CreateCallDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(CallStatus)
  status: CallStatus;

  @IsEnum(Specialty)
  specialty: Specialty;

  @IsEnum(Priority)
  @IsString()
  @IsOptional()
  priority: Priority;

  @IsOptional()
  @IsBoolean()
  technical_closure?: boolean;

  @IsOptional()
  @IsBoolean()
  user_closure?: boolean;

  @IsOptional()
  @Type(() => CreateCallUserDto)
  user_c: CreateCallUserDto;

  @IsOptional()
  @IsInt({ each: true })
  Service: number[];
}

export class AddImagemDto {
  url: string;

  title:string;

  file:string;
}
