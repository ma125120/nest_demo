import {
	Controller,
	Post,
	Body,
	Get,
	Param,
	Query,
	Delete,
	Put,
} from '@nestjs/common'
import { ProjectCateService } from '../projectCate.service'
import { CreateProjectCateDto, ProjectCateDto } from '../dto/index.dto'
import { ProjectCateRes, ProjectCatePageRes } from '../dto/res'
import { ProjectCate } from '../projectCate.entity'
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger'
import { PageDto } from '@/common/types/page.dto'
import { UseProjectCateInterceptor } from '../projectCate.interceptor'

@UseProjectCateInterceptor()
@ApiTags('客户端 项目种类 接口')
@Controller('api/projectCate')
export class ProjectCateClientController {
	constructor(private readonly service: ProjectCateService) {}

	@ApiOperation({
		summary: '新建projectCate',
		description: '新建projectCate',
	})
	@ApiResponse({
		type: ProjectCateRes,
		status: 201,
	})
	@Post()
	create(@Body() body: CreateProjectCateDto): Promise<ProjectCate> {
		return this.service.create(body)
	}

	@ApiOperation({
		summary: '更新projectCate',
		description: '更新projectCate',
	})
	@ApiResponse({
		type: ProjectCateRes,
		status: 201,
	})
	@Put()
	update(@Body() body: ProjectCateDto): Promise<ProjectCate> {
		return this.service.update(body)
	}

	@ApiOperation({
		summary: '查询所有的项目种类',
		description: '查询所有的项目种类',
	})
	@ApiResponse({
		status: 200,
		description: '项目种类',
		type: ProjectCatePageRes,
	})
	@Get()
	findAll(@Query() query: PageDto) {
		return this.service.findAll(query)
	}

	@ApiOperation({
		summary: '根据id查询projectCate',
		description: '根据id查询projectCate',
	})
	@ApiResponse({
		status: 200,
		description: 'projectCate',
		type: ProjectCateRes,
	})
	@Get(':id')
	find(@Param('id') id: string): Promise<ProjectCate> {
		return this.service.findOne(id)
	}

	@Delete(':id')
	delete(@Param('id') id: string): Promise<void> {
		return this.service.delete(id)
	}
}
