import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { ProfileInfoRequest, SignUpCredentials } from './user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getAll(): Promise<Array<ProfileInfoRequest>> {
    return (await this.userService.getAll()).map((user) => {
      return {
        id: user.id,
        gender: user.gender,
        name: user.name,
        birthday: user.birthday,
      };
    });
  }

  @Post()
  async create(@Body() user: SignUpCredentials): Promise<string> {
    const uid = await this.userService.create({
      email: user.email,
      password: user.password,
    });
    return uid;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() user: ProfileInfoRequest,
  ): Promise<ProfileInfoRequest> {
    const { name, gender, birthday } = await this.userService.update(id, {
      name: user.name,
      gender: user.gender,
      birthday: user.birthday,
    });
    return { id, name, gender, birthday };
  }
}
