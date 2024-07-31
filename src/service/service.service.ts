import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { Service } from '.prisma/client';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) { }

  async create(createServiceDto: CreateServiceDto) {
    const { technician_registration, call_id, ...serviceData } = createServiceDto;

    const existingTechnician = await this.prisma.users.findUnique({
      where: { registration: technician_registration },
    });
    if (!existingTechnician) {
      throw new NotFoundException(`Technician with registration ${technician_registration} not found`);
    }

    const existingCall = await this.prisma.call.findUnique({
      where: { id: call_id },
    });
    if (!existingCall) {
      throw new NotFoundException(`Call with ID ${call_id} not found`);
    }

    return this.prisma.service.create({
      data: {
        ...serviceData,
        tecnician: { connect: { registration: technician_registration } },
        call: { connect: { id: call_id } },
      },
    });

  }
  async list(){
    return this.prisma.service.findMany();
  }

  async findOne(id: number) {
    const service = await this.prisma.service.findUnique({
      where: { id },
    });
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return service;
  }
  async update(id: number, updateServiceDto: UpdateServiceDto){
    const { technician_registration, call_id, ...serviceData } = updateServiceDto;

    const existingService = await this.prisma.service.findUnique({
      where: { id },
    });
    if (!existingService) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    if (technician_registration) {
      const existingTechnician = await this.prisma.users.findUnique({
        where: { registration: technician_registration },
      });
      if (!existingTechnician) {
        throw new NotFoundException(`Technician with registration ${technician_registration} not found`);
      }
    }

    if (call_id) {
      const existingCall = await this.prisma.call.findUnique({
        where: { id: call_id },
      });
      if (!existingCall) {
        throw new NotFoundException(`Call with ID ${call_id} not found`);
      }
    }

    return this.prisma.service.update({
      where: { id },
      data: {
        ...serviceData,
        tecnician: technician_registration ? { connect: { registration: technician_registration } } : undefined,
        call: call_id ? { connect: { id: call_id } } : undefined,
      },
    });
  }

  async delete(id: number){
    const existingService = await this.prisma.service.findUnique({
      where: { id },
    });
    if (!existingService) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    return this.prisma.service.delete({
      where: { id },
    });
  }
}
