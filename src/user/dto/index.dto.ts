import { IsNotEmpty } from 'class-validator';
// import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '@/user/user.entity';
import { Exclude } from 'class-transformer';

export class CreateUserDto {
  constructor(partial: Partial<CreateUserDto>) {
    Object.assign(this, partial);
  }
  @IsNotEmpty()
  username: string;
  @Exclude()
  password: string;

  // @IsNotEmpty()
  nickName?: string;

  role?: Role;

  @Exclude()
  delete_time?: string;
}

export class UserDto extends CreateUserDto {
  id: number;
  token?: string;
}

export class UserLoginDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
