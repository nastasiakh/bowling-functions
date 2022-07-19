import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetsController } from './pets/pets.controller';
import { PetsService } from './pets/pets.service';
import { UsersController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [],
  controllers: [AppController, PetsController, UsersController],
  providers: [AppService, PetsService, UserService],
})
export class AppModule {}
