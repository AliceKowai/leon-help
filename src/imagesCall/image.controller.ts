import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors, UploadedFile, ParseFilePipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiConsumes } from '@nestjs/swagger';
import { extname } from 'path';
import { ImageService } from './image.service';
import { CreateImagemDto } from './dto/createImageCall.dto';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
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
    @UploadedFile() file: Express.Multer.File, 
    @Body() createImagemDto: CreateImagemDto
  ) {
    const { callId, title, url } = createImagemDto;
    const { path, originalname } = file;
    console.log(path, originalname)
    return this.imageService.addImage(path, originalname, callId, title, url);
  }

  @Get()
  async findAllImage() {
    return this.imageService.findAllImage();
  }

  @Get(':id')
  async findOneImage(@Param('idImage', ParseIntPipe) id: string) {
    return this.imageService.findOneImage(+id);
  }
  
  @Delete(':id')
  async removeImage(@Param('id', ParseIntPipe) id: string) {
    return this.imageService.removeImage(+id);
  }
}
