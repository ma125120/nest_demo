import { Injectable } from '@nestjs/common'
import { Job } from './job.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateJobDto, JobDto } from './dto/index.dto'
import { toPage, CityPageDto } from '@/common/types/page.dto'

@Injectable()
export class JobService {
	constructor(
		@InjectRepository(Job)
		private readonly repo: Repository<Job>,
	) {}

	create(body: CreateJobDto): Promise<Job> {
		const job = body as Job

		return this.repo.save(job)
	}

	async findAll(params: CityPageDto) {
		// const builder = this.repo.createQueryBuilder('user');
		// return builder.leftJoinAndSelect('user.papers', 'paper').take(1).skip(1).getManyAndCount();
		const conditions = {} as any
		if (params.cityId) {
			conditions.where = conditions.where || ({} as any)
			conditions.where.cityId = params.cityId
		}

		return this.repo.findAndCount(toPage(params, conditions))
	}

	async findAllList(cityId: string) {
		const params = {} as any
		if (cityId) params.cityId = cityId

		return this.repo.find(params)
	}

	async findAllWithDelete(): Promise<Job[]> {
		const builder = this.repo.createQueryBuilder()
		return builder.withDeleted().getMany()
	}

	findOne(id: string): Promise<Job> {
		return this.repo.findOne(id)
	}

	async delete(id: string): Promise<void> {
		await this.repo.softDelete(id)
	}

	async deleteReal(id: string): Promise<void> {
		await this.repo.delete(id)
	}

	async update(body: JobDto) {
		const job = body as Job
		return this.repo.save(job)
	}
}
