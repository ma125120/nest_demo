import {
	Controller,
	Get,
	Param,
	Query,
	// Delete,
	// Put,
	// Post,
	// Body,
} from '@nestjs/common'
import { CateResourceService } from '../cateResource.service'
// import { CreateCateResourceDto, CateResourceDto } from '../dto/index.dto'
import {
	CateResourceRes,
	CateResourcePageRes,
	CateResourceArrRes,
} from '../dto/res'
import { CateResource } from '../cateResource.entity'
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger'
// import { PageDto } from '@/common/types/page.dto'
import { UseCateResourceInterceptor } from '../cateResource.interceptor'
import { PageResourceDto } from '../dto/index.dto'

@UseCateResourceInterceptor()
@ApiTags('客户端 项目作品 接口')
@Controller('api/cateResource')
export class CateResourceClientController {
	constructor(private readonly service: CateResourceService) {}

	// @ApiOperation({
	// 	summary: '新建cateResource',
	// 	description: '新建cateResource',
	// })
	// @ApiResponse({
	// 	type: CateResourceRes,
	// 	status: 201,
	// })
	// @Post()
	// create(
	// 	@Body() body: CreateCateResourceDto,
	// ): Promise<CateResource | CateResource[]> {
	// 	return this.service.create(body)
	// }

	// @ApiOperation({
	// 	summary: '更新cateResource',
	// 	description: '更新cateResource',
	// })
	// @ApiResponse({
	// 	type: CateResourceRes,
	// 	status: 201,
	// })
	// @Put()
	// update(@Body() body: CateResourceDto): Promise<CateResource> {
	// 	return this.service.update(body)
	// }

	@ApiOperation({
		summary: '根据cateId查询所有作品，不分页',
		description: '根据cateId查询所有作品，不分页',
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
		summary: '一次性获取所有项目资源',
		description: '一次性获取所有项目资源',
	})
	@ApiResponse({
		status: 200,
		description: '所有的资源数据，需要自己分类排序',
		type: CateResourceArrRes,
	})
	@Get('all')
	findAllList() {
		return this.service.findAllList()
	}

	@ApiOperation({
		summary: '查询所有项目作品分页，传入cateId表示获取具体分类，不传则为全部',
		description:
			'查询所有项目作品分页，传入cateId表示获取具体分类，不传则为全部',
	})
	@ApiResponse({
		status: 200,
		description:
			'查询所有项目作品分页，传入cateId表示获取具体分类，不传则为全部',
		type: CateResourcePageRes,
	})
	@Get()
	findAll(@Query() query: PageResourceDto) {
		return this.service.findAll(query)
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

	// @Delete(':id')
	// delete(@Param('id') id: string): Promise<void> {
	// 	return this.service.delete(id)
	// }
}
