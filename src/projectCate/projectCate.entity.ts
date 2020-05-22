import {
	// Column,
	Entity,
	PrimaryGeneratedColumn,
	Index,
	DeleteDateColumn,
	UpdateDateColumn,
	CreateDateColumn,
	Column,
	OneToMany,
} from 'typeorm'

import { Exclude, Expose } from 'class-transformer'
import { CateResource } from '@/cateResource/cateResource.entity'
import { ApiPropertyOptional } from '@nestjs/swagger'

@Entity()
export class ProjectCate {
	constructor(partial: Partial<ProjectCate>) {
		Object.assign(this, partial)
	}

	@PrimaryGeneratedColumn()
	id?: number

	@Index('name', { unique: true })
	@Column()
	name: string

	@Column()
	title: string

	@Column()
	desc: string

	@ApiPropertyOptional()
	@Expose()
	get titles() {
		return this.title ? this.title.split(/\s+/g) : []
	}

	@OneToMany(
		() => CateResource,
		(res) => res.cate,
	)
	resources: CateResource[]

	@CreateDateColumn()
	create_time?: string

	@UpdateDateColumn()
	update_time?: string

	@Exclude()
	@DeleteDateColumn()
	delete_time?: string
}
