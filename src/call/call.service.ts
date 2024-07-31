import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCallDto } from './dto/create-call.dto';
import { Call } from '@prisma/client';

@Injectable()
export class CallService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCallDto: CreateCallDto){
    const { Service, ...callData } = createCallDto;
  
    let serviceConnect = [];
    if (Array.isArray(Service)) {
      serviceConnect = Service.map(serviceId => ({ id: serviceId }));
    }
  
    return await this.prisma.call.create({
      data: {
        ...callData,
        user_c: {
          connect: { registration: createCallDto.user_c.user_registration },
        },
        Service: {
          connect: serviceConnect,
        },
      },
    });
  }
  
  async addImage(callId: number, url: string, title:string) {
    return this.prisma.imagem.create({
      data: {
        url,
        title,
        Call: {
          connect: { id: callId },
        },
      },
    });
  }
  
  async findAllImage() {
    // Encontre todas as chamadas usando o Prisma
    return await this.prisma.imagem.findMany();
  }

  async findOneImage(id: number) {
    // Encontre uma chamada específica pelo ID usando o Prisma
    const image = await this.prisma.imagem.findUnique({
      where: {
        id,
      },
      include: {
        Call: true, // Isso irá incluir os atendimentos relacionados a chamada
    },
    });

    // Verifique se a chamada foi encontrada, caso contrário, lance uma exceção
    if (!image) {
      throw new NotFoundException(`Chamada com ID ${id} não encontrada`);
    }

    return image;
  }

  async removeImage(id: number) {
    // Remova uma chamada específica pelo ID usando o Prisma
    return await this.prisma.imagem.delete({
      where: {
        id,
      },
    });
  }



  async findAll() {
    // Encontre todas as chamadas usando o Prisma
    return await this.prisma.call.findMany();
  }

  async findOne(id: number) {
    // Encontre uma chamada específica pelo ID usando o Prisma
    const call = await this.prisma.call.findUnique({
      where: {
        id,
      },
      include: {
        Service: true, // Isso irá incluir os atendimentos relacionados a chamada
        imagens:true
    },
    });

    // Verifique se a chamada foi encontrada, caso contrário, lance uma exceção
    if (!call) {
      throw new NotFoundException(`Chamada com ID ${id} não encontrada`);
    }

    return call;
  }

  async update(id: number, updateCallDto: Partial<CreateCallDto>){
    const { Service, ...updateData } = updateCallDto;
  
    // Verifique se há dados a serem atualizados
    if (!Object.keys(updateData).length) {
      throw new BadRequestException('Nenhum dado de atualização fornecido');
    }
  
    // Atualize a chamada no banco de dados usando o Prisma
    return await this.prisma.call.update({
      where: {
        id,
      },
      data: {
        ...updateData,
        user_c: {
          connect: { registration: updateCallDto.user_c.user_registration }, // Conectar o usuário associado
        },
        Service: {
          connect: (Service || []).map(serviceId => ({ id: serviceId })),
        },
      },
    });
  }
  
  

  async remove(id: number) {
    // Remova uma chamada específica pelo ID usando o Prisma
    return await this.prisma.call.delete({
      where: {
        id,
      },
    });
  }
}
