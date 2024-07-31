import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateImagemDto } from './dto/createImageCall.dto';

@Injectable()
export class ImageService {
  constructor(private readonly prisma: PrismaService) {}
  
  async addImage(filePath: string, fileTitle: string, callId: string, title: string, url: string) {
    const callIdInt = parseInt(callId, 10);
    return this.prisma.imagem.create({
      data: {
        url: filePath,
        title: fileTitle,
        Call: {
          connect: { id:callIdInt },
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
}