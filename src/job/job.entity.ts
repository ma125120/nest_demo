import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	Index,
	DeleteDateColumn,
	UpdateDateColumn,
	CreateDateColumn,
} from 'typeorm'

import { Exclude, Expose } from 'class-transformer'
import { cityObj } from '@/common/enum'

@Index(['cityId', 'name'], { unique: true })
@Entity()
export class Job {
	constructor(partial: Partial<Job>) {
		Object.assign(this, partial)
	}

	@PrimaryGeneratedColumn()
	id?: number

	@Column()
	name: string

	@Column()
	content: string

	@Column()
	cityId: number

	@Expose()
	get city() {
		return cityObj[this.cityId] || ''
	}

	@Column({ default: '' })
	note?: string

	@CreateDateColumn()
	create_time?: string

	@UpdateDateColumn()
	update_time?: string

	@Exclude()
	@DeleteDateColumn()
	delete_time?: string
}
