import {
	Controller,
	Post,
	Body,
	Get,
	Query,
	Param,
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
@ApiTags('服务端projectCate接口')
@Controller('end/projectCate')
export class ProjectCateServerController {
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
		summary: '查询所有projectCate',
		description: '查询所有projectCate',
	})
	@ApiResponse({
		status: 200,
		description: 'projectCate分页',
		type: ProjectCatePageRes,
	})
	@Get()
	findAll(@Query() query: PageDto) {
		return this.service.findAll(query)
	}

	@Get('/all')
	findAllWithDelete(): Promise<ProjectCate[]> {
		return this.service.findAllWithDelete()
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

	@Delete(`/real/:id`)
	deleteReal(@Param('id') id: string): Promise<void> {
		return this.service.deleteReal(id)
	}
}
