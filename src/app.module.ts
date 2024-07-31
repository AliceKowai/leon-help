import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CallModule } from './call/call.module';
import { ServiceModule } from './service/service.module';
import { PossibleProblemsModule } from './possible-problems/possible-problems.module';
import { EquipmentModule } from './equipment/equipment.module';
import { MulterModule } from '@nestjs/platform-express';
import { ImageModule } from './imagesCall/image.module';

@Module({
  imports: [UsersModule, CallModule, ServiceModule, PossibleProblemsModule, EquipmentModule, MulterModule.register({dest:'./uploads'}), ImageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
