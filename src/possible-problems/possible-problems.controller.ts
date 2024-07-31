import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PossibleProblemsService } from './possible-problems.service';
import { CreatePossibleProblemDto } from './dto/create-possible-problem.dto';
import { UpdatePossibleProblemDto } from './dto/update-possible-problem.dto';

@Controller('possible-problems')
export class PossibleProblemsController {
  constructor(private readonly possibleProblemsService: PossibleProblemsService) {}

  @Post()
  async create(@Body() createPossibleProblemDto: CreatePossibleProblemDto) {
    return this.possibleProblemsService.create(createPossibleProblemDto);
  }

  @Get()
  async findAll() {
    return this.possibleProblemsService.findAll();
  }
  @Get(':id', )
  async findOne(@Param('id', ParseIntPipe) id: string) {
    return this.possibleProblemsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: string, @Body() updatePossibleProblemDto: UpdatePossibleProblemDto) {
    return this.possibleProblemsService.update(+id, updatePossibleProblemDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: string) {
    return this.possibleProblemsService.remove(+id);
  }
}
