import { Injectable } from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EquipmentService {
  constructor(private readonly prisma: PrismaService){}
  async create(createEquipmentDto: CreateEquipmentDto) {
    const {type, model, brand, invoice, user_name, maintenance_numbers, serial_number} = createEquipmentDto;

    return this.prisma.equipment.create({
      data:{
        type,
        model,
        brand,
        invoice,
        user_name,
        maintenance_numbers,
        serial_number,
      }
    });
  }

  async findAll() {
    return this.prisma.equipment.findMany();
  }

  async findOne(id: number) {
    return this.prisma.equipment.findUnique({
      where: {
        id,
      }
    });
  }

  async update(id: number, updateEquipmentDto: UpdateEquipmentDto) {
    return this.prisma.equipment.update({
      where:{
        id
      },
      data:updateEquipmentDto
    });
  }

  async remove(id: number) {
    return this.prisma.equipment.delete({
      where:{
        id
      }
    });
  }
}
