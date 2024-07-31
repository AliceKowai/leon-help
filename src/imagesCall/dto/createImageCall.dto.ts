import { ParseIntPipe } from "@nestjs/common";
import { Transform } from "class-transformer";
import { IsInt, IsString } from "class-validator";

export class CreateImagemDto {
  callId:string;
  url: string;
  title:string;
  file:string;
}
