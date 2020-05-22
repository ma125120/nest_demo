import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Index,
  // OneToMany,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';
import { sha1 } from '../common/util/index';
// import { Paper } from '@/paper/paper.entity';

export enum Role {
  superadmin = 1,
  admin = 10,
  user = 100,
}

@Index(['username', 'password'], { unique: true })
@Entity()
export class User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  username: string;

  @Exclude()
  @Column({ default: sha1('123456') })
  password: string;

  @Column({ default: '' })
  nickName: string;

  @Column({ default: Role.user })
  role: Role;

  @Expose()
  get roleName() {
    return Role[this.role];
  }

  @Expose()
  get name() {
    return Role[this.role];
  }

  // @OneToMany(
  //   () => Paper,
  //   paper => paper.user,
  // )
  // papers: Paper[];

  @CreateDateColumn()
  create_time?: string;

  @UpdateDateColumn()
  update_time?: string;

  @Exclude()
  @DeleteDateColumn()
  delete_time?: string;
}
