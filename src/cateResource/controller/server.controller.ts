import {
	Controller,
	Post,
	Body,
	Get,
	Query,
	Param,
	Delete,
	Put,
	UseInterceptors,
	ClassSerializerInterceptor,
} from '@nestjs/common'
import { CateResourceService } from '../cateResource.service'
import { CreateCateResourceDto, CateResourceDto } from '../dto/index.dto'
import { CateResourceRes, CateResourcePageRes } from '../dto/res'
import { CateResource } from '../cateResource.entity'
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger'
import { PageDto } from '@/common/types/page.dto'
import { UseCateResourceInterceptor } from '../cateResource.interceptor'

@UseCateResourceInterceptor()
@ApiTags('服务端cateResource接口')
@Controller('end/cateResource')
export class CateResourceServerController {
	constructor(private readonly service: CateResourceService) {}

	@ApiOperation({
		summary: '新建cateResource',
		description: '新建cateResource',
	})
	@ApiResponse({
		type: CateResourceRes,
		status: 201,
	})
	@Post()
	create(
		@Body() body: CreateCateResourceDto,
	): Promise<CateResource | CateResource[]> {
		return this.service.create(body)
	}

	@ApiOperation({
		summary: '更新cateResource',
		description: '更新cateResource',
	})
	@ApiResponse({
		type: CateResourceRes,
		status: 201,
	})
	@Put()
	update(@Body() body: CateResourceDto): Promise<CateResource> {
		return this.service.update(body)
	}

	@UseInterceptors(ClassSerializerInterceptor)
	@ApiOperation({
		summary: '查询所有cateResource',
		description: '查询所有cateResource',
	})
	@ApiResponse({
		status: 200,
		description: 'cateResource分页',
		type: CateResourcePageRes,
	})
	@Get()
	findAll(@Query() query: PageDto) {
		return this.service.findAll(query)
	}

	@Get('/all')
	findAllWithDelete(): Promise<CateResource[]> {
		return this.service.findAllWithDelete()
	}

	@ApiOperation({
		summary: '根据cateId查询cateResource',
		description: '根据cateId查询cateResource',
	})
	@ApiResponse({
		status: 200,
		description: 'cateResource',
		type: CateResourceRes,
	})
	@Get('/cate')
	findByCate(@Query('cateId') cateId: string): Promise<CateResource[]> {
		return this.service.findByCate(cateId)
	}

	@ApiOperation({
		summary: '更新resource排序',
		// description: '根据cateId查询cateResource',
	})
	@ApiResponse({
		status: 200,
		description: 'cateResource',
		type: CateResourceRes,
	})
	@Post('many')
	updateMany(@Body('list') body): Promise<CateResource[]> {
		return this.service.updateMany(body)
	}

	@ApiOperation({
		summary: '根据id查询cateResource',
		description: '根据id查询cateResource',
	})
	@ApiResponse({
		status: 200,
		description: 'cateResource',
		type: CateResourceRes,
	})
	@Get(':id')
	find(@Param('id') id: string): Promise<CateResource> {
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
