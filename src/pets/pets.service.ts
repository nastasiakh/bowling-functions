import { Injectable } from '@nestjs/common';
import { PetEntity } from './pet.entity';

@Injectable()
export class PetsService {
  private _pets: Array<PetEntity> = [{ id: 0, name: 'Barsik', gender: 'male' }];

  getAll(): Array<PetEntity> {
    return this._pets;
  }

  create(pet: PetEntity): PetEntity {
    this._pets.push(pet);
    return pet;
  }

  delete(petId: number): PetEntity {
    const pet = this._pets.find((p) => p.id === petId);
    this._pets = this._pets.filter((p) => p.id !== petId);
    return pet;
  }
}
