import { PartialType } from '@nestjs/mapped-types';
import { CreatePossibleProblemDto } from './create-possible-problem.dto';

export class UpdatePossibleProblemDto extends PartialType(CreatePossibleProblemDto) {}
