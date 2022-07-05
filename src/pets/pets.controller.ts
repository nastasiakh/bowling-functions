import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PetDto } from './pets.dto';
import { PetsService } from './pets.service';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}
  @Get()
  async getAll(): Promise<Array<PetDto>> {
    return (await this.petsService.getAll()).map((p) => {
      return { id: p.id, name: p.name };
    });
  }

  @Get(':id')
  async getById(@Param('id') petId: string): Promise<PetDto> {
    const { id, name } = await this.petsService.getById(petId);
    return { id, name };
  }

  @Post()
  async create(@Body() pet: PetDto): Promise<PetDto> {
    const { id, name } = await this.petsService.create({
      ...pet,
      gender: 'male',
    });
    return { id, name };
  }

  @Delete(':id')
  async delete(@Param('id') petId: string): Promise<PetDto> {
    const { id, name } = await this.petsService.delete(petId);
    return { id, name };
  }
}
