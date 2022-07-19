import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ProfileInfo, ProfileInfoRequest, SignUpCredentials } from './user.dto';

@Injectable()
export class UserService {
  async getAll(): Promise<ProfileInfo[]> {
    const reference = await admin.firestore().collection('users').get();
    return reference.docs.map((data) => {
      return {
        id: data.id,
        name: data.data()['name'],
        gender: data.data()['gender'],
        birthday: data.data()['birthday'],
      };
    });
  }

  async create(user: SignUpCredentials): Promise<string> {
    const reference = await admin.firestore().collection('users').add({
      email: user.email,
      password: user.password,
    });
    return reference.id;
  }

  async update(
    id: string,
    user: ProfileInfoRequest,
  ): Promise<ProfileInfoRequest> {
    await admin.firestore().collection('users').doc(id).update({
      name: user.name,
      gender: user.gender,
      birthday: user.birthday,
    });
    return {
      id: id,
      name: user.name,
      gender: user.gender,
      birthday: user.birthday,
    };
  }
}
