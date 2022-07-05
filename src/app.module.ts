import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetsController } from './pets/pets.controller';
import { PetsService } from './pets/pets.service';

@Module({
  imports: [],
  controllers: [AppController, PetsController],
  providers: [AppService, PetsService],
})
export class AppModule {}
