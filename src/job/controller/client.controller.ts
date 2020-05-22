import {
	Controller,
	Get,
	Param,
	Query,
	// Delete,
	// Post,
	// Body,
	// Query,
	// Put,
	// UseInterceptors,
	// ClassSerializerInterceptor,
} from '@nestjs/common'
import { JobService } from '../job.service'
// import { CreateJobDto, JobDto } from '../dto/index.dto'
import { JobRes, JobArrRes } from '../dto/res'
import { Job } from '../job.entity'
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger'
// import { PageDto } from '@/common/types/page.dto'
import { UseJobInterceptor } from '../job.interceptor'

@UseJobInterceptor()
@ApiTags('客户端招聘信息接口')
@Controller('api/job')
export class JobClientController {
	constructor(private readonly service: JobService) {}

	// @ApiOperation({
	// 	summary: '新建job',
	// 	description: '新建job',
	// })
	// @ApiResponse({
	// 	type: JobRes,
	// 	status: 201,
	// })
	// @Post()
	// create(@Body() body: CreateJobDto): Promise<Job> {
	// 	return this.service.create(body)
	// }

	// @ApiOperation({
	// 	summary: '更新job',
	// 	description: '更新job',
	// })
	// @ApiResponse({
	// 	type: JobRes,
	// 	status: 201,
	// })
	// @Put()
	// update(@Body() body: JobDto): Promise<Job> {
	// 	return this.service.update(body)
	// }

	// @UseInterceptors(ClassSerializerInterceptor)
	// @ApiOperation({
	// 	summary: '查询所有job',
	// 	description: '查询所有job',
	// })
	// @ApiResponse({
	// 	status: 200,
	// 	description: 'job分页',
	// 	type: JobPageRes,
	// })
	// @Get()
	// findAll(@Query() query: PageDto) {
	// 	return this.service.findAll(query)
	// }

	@ApiOperation({
		summary: '根据id查询job',
		description: '根据id查询job',
	})
	@ApiResponse({
		status: 200,
		description: 'job',
		type: JobRes,
	})
	@Get(':id')
	find(@Param('id') id: string): Promise<Job> {
		return this.service.findOne(id)
	}

	@ApiOperation({
		summary: '一次性获取所有数据，传入cityId则表示筛选',
		description: '一次性获取所有数据',
	})
	@ApiResponse({
		status: 200,
		description: 'job',
		type: JobArrRes,
	})
	@Get('')
	findAllList(@Query('cityId') cityId: string): Promise<Job[]> {
		return this.service.findAllList(cityId)
	}

	// @Delete(':id')
	// delete(@Param('id') id: string): Promise<void> {
	// 	return this.service.delete(id)
	// }
}
