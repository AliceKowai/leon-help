import { IsEnum, IsString } from "class-validator";
import { Specialty } from "@prisma/client";
export class CreatePossibleProblemDto {
  @IsEnum(Specialty, { message: "type must be one of the following values: ${Object.values(Specialty)}" })
  specialty: Specialty;
    @IsString()
    title: string;
}
