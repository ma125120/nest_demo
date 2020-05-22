import {
	// Column,
	Entity,
	PrimaryGeneratedColumn,
	// Index,
	DeleteDateColumn,
	UpdateDateColumn,
	CreateDateColumn,
	Column,
} from 'typeorm'

import { Exclude, Expose } from 'class-transformer'
import { cityObj } from '@/common/enum'

@Entity()
export class Record {
	constructor(partial: Partial<Record>) {
		Object.assign(this, partial)
	}

	@PrimaryGeneratedColumn()
	id?: number

	@Column()
	name: string

	@Column()
	tel: string

	@Column()
	content: string

	@Column({ default: 1 })
	cityId: number

	@Expose()
	get city() {
		return cityObj[this.cityId || 1] || ''
	}

	@Column('int', { default: 0 })
	read: number

	@Expose()
	get hasRead() {
		return this.read === 0 ? '未读' : '已读'
	}

	@CreateDateColumn()
	create_time?: string

	@UpdateDateColumn()
	update_time?: string

	@Exclude()
	@DeleteDateColumn()
	delete_time?: string
}
