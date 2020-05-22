
import { Controller, Post, Body, Get, Query, Param, Delete, Put, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { JobService } from '../job.service';
import { CreateJobDto, JobDto } from '../dto/index.dto';
import { JobRes, JobPageRes } from '../dto/res';
import { Job } from '../job.entity';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { PageDto } from '@/common/types/page.dto';
import { UseJobInterceptor } from '../job.interceptor';

@UseJobInterceptor()
@ApiTags('服务端job接口')
@Controller('end/job')
export class JobServerController {
  constructor(private readonly service: JobService) {}

  @ApiOperation({
    summary: '新建job',
    description: '新建job',
  })
  @ApiResponse({
    type: JobRes,
    status: 201,
  })
  @Post()
  create(@Body() body: CreateJobDto): Promise<Job> {
    return this.service.create(body);
  }

  @ApiOperation({
    summary: '更新job',
    description: '更新job',
  })
  @ApiResponse({
    type: JobRes,
    status: 201,
  })
  @Put()
  update(@Body() body: JobDto): Promise<Job> {
    return this.service.update(body);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    summary: '查询所有job',
    description: '查询所有job',
  })
  @ApiResponse({
    status: 200,
    description: 'job分页',
    type: JobPageRes,
  })
  @Get()
  findAll(@Query() query: PageDto) {
    return this.service.findAll(query);
  }

  @Get('/all')
  findAllWithDelete(): Promise<Job[]> {
    return this.service.findAllWithDelete();
  }

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
    return this.service.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }

  @Delete(`/real/:id`)
  deleteReal(@Param('id') id: string): Promise<void> {
    return this.service.deleteReal(id);
  }
}
