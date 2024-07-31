import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors, UploadedFile, ParseFilePipe } from '@nestjs/common';
import { CallService } from './call.service';
import { AddImagemDto, CreateCallDto } from './dto/create-call.dto';
import { UpdateCallDto } from './dto/update-call.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiConsumes } from '@nestjs/swagger';
import { extname } from 'path';

@Controller('calls')
export class CallController {
  constructor(private readonly callService: CallService) {}

  @Post()
  async create(@Body() createCallDto: CreateCallDto) {
    return this.callService.create(createCallDto);
  }

  @Post(':id/imagem')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async addImagem(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.callService.addImage(id, file.path, file.originalname);
  }

  @Get(':id/imagem')
  async findAllImage() {
    return this.callService.findAllImage();
  }

  @Get(':id/imagem/:idImage')
  async findOneImage(@Param('idImage', ParseIntPipe) id: string) {
    return this.callService.findOneImage(+id);
  }
  
  @Get()
  async findAll() {
    return this.callService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string) {
    return this.callService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: string, @Body() updateCallDto: UpdateCallDto) {
    return this.callService.update(+id, updateCallDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: string) {
    return this.callService.remove(+id);
  }

  @Delete(':id/imagem/:idImage')
  async removeImage(@Param('id', ParseIntPipe) id: string) {
    return this.callService.removeImage(+id);
  }
}
