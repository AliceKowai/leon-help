import { Injectable } from '@nestjs/common';
import { CreatePossibleProblemDto } from './dto/create-possible-problem.dto';
import { UpdatePossibleProblemDto } from './dto/update-possible-problem.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PossibleProblemsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPossiblePoblemDto: CreatePossibleProblemDto) {
    const {specialty,title} = createPossiblePoblemDto;

    return this.prisma.possibleProblems.create({
      data:{
        specialty,
        title
      }
    });
  }

  async findAll() {
    return this.prisma.possibleProblems.findMany();
  }

  async findOne(id: number) {
    return this.prisma.possibleProblems.findUnique({
      where: {
        id,
      }
    });
  }

  async update(id: number, updatePossibleProblemDto: UpdatePossibleProblemDto) {
    return this.prisma.possibleProblems.update({
      where:{
        id
      },
      data:updatePossibleProblemDto
    });
  }

  async remove(id: number) {
    return this.prisma.possibleProblems.delete({
      where:{
        id
      }
    });
  }
}
