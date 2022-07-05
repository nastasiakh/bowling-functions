import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { PetDto } from './pets.dto';
import { PetsService } from './pets.service';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}
  private _pets: Array<PetDto> = [{ id: 0, name: 'Barsik' }];
  @Get()
  getAll(): Array<PetDto> {
    return this.petsService.getAll().map((p) => {
      return { id: p.id, name: p.name };
    });
  }

  @Post()
  create(@Body() pet: PetDto): PetDto {
    const { id, name } = this.petsService.create({ ...pet, gender: 'male' });
    return { id, name };
  }

  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) petId: number): PetDto {
    const { id, name } = this.petsService.delete(petId);
    return { id, name };
  }
}
