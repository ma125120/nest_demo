import { Injectable } from '@nestjs/common'
import { ProjectCate } from './projectCate.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateProjectCateDto, ProjectCateDto } from './dto/index.dto'
import { PageDto } from '@/common/types/page.dto'

@Injectable()
export class ProjectCateService {
	constructor(
		@InjectRepository(ProjectCate)
		private readonly repo: Repository<ProjectCate>,
	) {}

	create(body: CreateProjectCateDto): Promise<ProjectCate> {
		const projectCate = body as ProjectCate

		return this.repo.save(projectCate)
	}
	// eslint-disable-next-line
	async findAll(params: PageDto) {
		// console.log(params)
		// const builder = this.repo.createQueryBuilder('user');
		// return builder.leftJoinAndSelect('user.papers', 'paper').take(1).skip(1).getManyAndCount();
		return this.repo.find()
		// return this.repo.findAndCount(toPage(params));
	}

	async findAllWithDelete(): Promise<ProjectCate[]> {
		const builder = this.repo.createQueryBuilder()
		return builder.withDeleted().getMany()
	}

	findOne(id: string): Promise<ProjectCate> {
		return this.repo.findOne(id)
	}

	async delete(id: string): Promise<void> {
		await this.repo.softDelete(id)
	}

	async deleteReal(id: string): Promise<void> {
		await this.repo.delete(id)
	}

	async update(body: ProjectCateDto) {
		const projectCate = body as ProjectCate
		return this.repo.save(projectCate)
	}
}
