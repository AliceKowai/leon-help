import { Module } from '@nestjs/common';
import { PossibleProblemsService } from './possible-problems.service';
import { PossibleProblemsController } from './possible-problems.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [PossibleProblemsController],
  providers: [PossibleProblemsService],
})
export class PossibleProblemsModule {}
