import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import {StatusEquipament } from "@prisma/client";
export class CreateEquipmentDto {
    @IsString()
    type: string;
    @IsString()
    model: string;
    @IsString()
    brand: string;
    @IsString()
    invoice: string;
    @IsString()
    user_name: string
    @IsOptional()
    @IsEnum(StatusEquipament, { message: "type must be one of the following values: ${Object.values(StatusEquipament)}" })
    status_equipment: StatusEquipament;
    @IsInt()
    @IsOptional()
    maintenance_numbers: number
    @IsString()
    serial_number: string
}
