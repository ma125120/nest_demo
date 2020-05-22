import {
  // Column,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class Base {
  constructor(partial: Partial<any>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn()
  create_time?: string;
  @UpdateDateColumn()
  update_time?: string;
  @Exclude()
  @DeleteDateColumn()
  delete_time?: string;
}
