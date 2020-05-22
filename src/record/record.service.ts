import { Injectable } from '@nestjs/common'
import { Record } from './record.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateRecordDto, RecordDto } from './dto/index.dto'
import { PageDto, toPage } from '@/common/types/page.dto'

@Injectable()
export class RecordService {
	constructor(
		@InjectRepository(Record)
		private readonly repo: Repository<Record>,
	) {}

	create(body: CreateRecordDto): Promise<Record> {
		const record = body as Record

		return this.repo.save(record)
	}

	async findAll(params: PageDto) {
		// const builder = this.repo.createQueryBuilder('user');
		// return builder.leftJoinAndSelect('user.papers', 'paper').take(1).skip(1).getManyAndCount();
		const conditions = {
			order: {
				read: 'DESC',
			},
		} as any
		if (params.cityId) {
			conditions.where = conditions.where || ({} as any)
			conditions.where.cityId = params.cityId
		}

		return this.repo.findAndCount(toPage(params, conditions))
	}

	async findAllWithDelete(): Promise<Record[]> {
		const builder = this.repo.createQueryBuilder()
		return builder.withDeleted().getMany()
	}

	findOne(id: string): Promise<Record> {
		return this.repo.findOne(id)
	}

	async delete(id: string): Promise<void> {
		await this.repo.softDelete(id)
	}

	async deleteReal(id: string): Promise<void> {
		await this.repo.delete(id)
	}

	async update(body: RecordDto) {
		const record = body as Record
		return this.repo.save(record)
	}
}
