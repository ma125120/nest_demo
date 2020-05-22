import { Injectable, HttpException } from '@nestjs/common'
import { CateResource } from './cateResource.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCateResourceDto, CateResourceDto } from './dto/index.dto'
import { PageDto, toPage } from '@/common/types/page.dto'
import { ProjectCate } from '@/projectCate/projectCate.entity'

const order = { sort: 'DESC' } as any

@Injectable()
export class CateResourceService {
	constructor(
		@InjectRepository(CateResource)
		private readonly repo: Repository<CateResource>,
		@InjectRepository(ProjectCate)
		private readonly proRepo: Repository<ProjectCate>,
	) {}

	async create(
		body: CreateCateResourceDto,
	): Promise<CateResource | CateResource[]> {
		const cate = await this.proRepo.findOne(body.cateId)
		if (!cate) {
			throw new HttpException(`种类不存在，无法添加或修改`, 501)
		}

		body.cate = cate

		// if (body.id) {
		// 	const url = body.fileList?.[0]
		// 	if (!url) {
		// 		throw new HttpException(`图片地址为空，无法添加或修改`, 501)
		// 	}
		// 	return this.repo.save(new CateResource({ ...body, url }))
		// }

		// const list = body.fileList.map((v) => new CateResource({ url: v, cate }))
		// const cateResource = body as CateResource

		return this.repo.save(body)
	}

	async findByCate(cateId) {
		return this.repo.find({
			where: {
				cateId,
			},
			order,
			relations: ['cate'],
		})
	}

	async findAll(params: PageDto) {
		// const builder = this.repo.createQueryBuilder('cateResource')
		// return builder
		// 	.leftJoinAndSelect('cateResource.cate', 'projectCate')
		// 	.take(params.size)
		// 	.skip(params.current * params.size)
		// 	.getManyAndCount()

		return this.repo.findAndCount(
			toPage(params, {
				relations: ['cate'],
				order,
				where: params.cateId ? { cateId: params.cateId } : {},
			}),
		)
	}

	async findAllList() {
		return this.repo.find({ order })
	}

	async findAllWithDelete(): Promise<CateResource[]> {
		const builder = this.repo.createQueryBuilder()
		return builder.withDeleted().getMany()
	}

	findOne(id: string): Promise<CateResource> {
		return this.repo.findOne(id)
	}

	async delete(id: string): Promise<void> {
		await this.repo.softDelete(id)
	}

	async deleteReal(id: string): Promise<void> {
		await this.repo.delete(id)
	}

	async update(body: CateResourceDto) {
		const cateResource = body as CateResource
		return this.repo.save(cateResource)
	}

	async updateMany(body: CateResource[]) {
		const cateResources = body
		return this.repo.save(cateResources)
	}
}
