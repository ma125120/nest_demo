import { Injectable } from '@nestjs/common';
import { UserService } from './user/user.service';
// import { RedisService } from 'nestjs-redis';

@Injectable()
export class AppService {
  constructor(private userService: UserService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async init() {
    const user = {
      username: 'admin',
      password: '123456',
      role: 1,
    };
    await this.userService.createAdmin(user);
  }

  // async setName(name: string) {
  //   const client = this.redisService.getClient()
  //   client.set('name', name)
  // }

  // async getName() {
  //   const client = await this.redisService.getClient();
  //   return client.get('name');
  // }
}
