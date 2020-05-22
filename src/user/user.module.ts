
import { Module, } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
// import { UserController } from './user.controller';
import { AuthModule } from '@/auth/auth.module'
import { UserClientController } from './controller/user.client.controller'
import { UserServerController } from './controller/user.server.controller'

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  providers: [UserService],
  controllers: [UserClientController, UserServerController],
  exports: [UserService],
})
export class UserModule {}
