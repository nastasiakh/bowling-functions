import { Injectable } from '@nestjs/common';
import { PetEntity } from './pet.entity';
import * as admin from 'firebase-admin';
admin.initializeApp();

@Injectable()
export class PetsService {
  async getAll(): Promise<Array<PetEntity>> {
    const reference = await admin.firestore().collection('pets').get();
    return reference.docs.map((data) => {
      return {
        id: data.id,
        name: data.data()['name'],
        gender: data.data()['gender'],
      };
    });
  }

  async create(pet: PetEntity): Promise<PetEntity> {
    const reference = await admin.firestore().collection('pets').add({
      name: pet.name,
      gender: pet.gender,
    });
    return { id: reference.id, name: pet.name, gender: pet.gender };
  }

  async getById(petId: string): Promise<PetEntity> {
    const reference = await admin
      .firestore()
      .collection('pets')
      .doc(petId)
      .get();
    return {
      id: reference.id,
      name: reference.data()['name'],
      gender: reference.data()['gender'],
    };
  }

  async delete(petId: string): Promise<PetEntity> {
    const reference = await admin
      .firestore()
      .collection('pets')
      .doc(petId)
      .get();
    if (reference.exists) {
      await admin.firestore().collection('pets').doc(petId).delete();
      return {
        id: reference.id,
        name: reference.data()['name'],
        gender: reference.data()['gender'],
      };
    } else {
      throw 'Pet not found';
    }
  }
}
