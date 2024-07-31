import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePatchUserDto } from './dto/updatePatchUserDto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async list() {
    return this.usersService.list();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.show(+id);
  }

  @Patch(':id')
  async update(@Param('id',ParseIntPipe) id: string, @Body() updatePatchUserDto: UpdatePatchUserDto) {
    return this.usersService.updatePartial(+id, updatePatchUserDto);
  }

  @Delete(':id')
  async remove(@Param('id',ParseIntPipe) id: string) {
    return this.usersService.delete(+id);
  }
}
