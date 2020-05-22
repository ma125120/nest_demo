import {
	Entity,
	PrimaryGeneratedColumn,
	// Index,
	DeleteDateColumn,
	UpdateDateColumn,
	CreateDateColumn,
	Column,
	ManyToOne,
	JoinColumn,
} from 'typeorm'

import { Exclude, Expose } from 'class-transformer'
import { ProjectCate } from '@/projectCate/projectCate.entity'
import dayjs = require('dayjs')

@Entity()
export class CateResource {
	constructor(partial: Partial<CateResource>) {
		Object.assign(this, partial)
	}

	@PrimaryGeneratedColumn()
	id?: number

	@Column()
	url?: string

	@Column()
	name?: string

	@Column()
	desc?: string

	@Column()
	date?: string

	@Expose()
	get dateStr() {
		return dayjs(this.date).format(`YYYY年`)
	}

	@Column({ name: 'cate_id' })
	cateId?: string

	@Column({ default: -1 })
	sort?: number

	@ManyToOne(
		() => ProjectCate,
		(project) => project.resources,
		{
			cascade: ['insert'],
		},
	)
	@JoinColumn({ name: 'cate_id' })
	cate?: ProjectCate

	// @Expose()
	// get note() {
	// 	return 'note'
	// }

	@CreateDateColumn()
	create_time?: string

	@Exclude()
	@UpdateDateColumn()
	update_time?: string

	@Exclude()
	@DeleteDateColumn()
	delete_time?: string
}
