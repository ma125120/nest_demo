
import { Controller, Post, Body, Get, Query, Param, Delete, Put, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { RecordService } from '../record.service';
import { CreateRecordDto, RecordDto } from '../dto/index.dto';
import { RecordRes, RecordPageRes } from '../dto/res';
import { Record } from '../record.entity';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { PageDto } from '@/common/types/page.dto';
import { UseRecordInterceptor } from '../record.interceptor';

@UseRecordInterceptor()
@ApiTags('服务端record接口')
@Controller('end/record')
export class RecordServerController {
  constructor(private readonly service: RecordService) {}

  @ApiOperation({
    summary: '新建record',
    description: '新建record',
  })
  @ApiResponse({
    type: RecordRes,
    status: 201,
  })
  @Post()
  create(@Body() body: CreateRecordDto): Promise<Record> {
    return this.service.create(body);
  }

  @ApiOperation({
    summary: '更新record',
    description: '更新record',
  })
  @ApiResponse({
    type: RecordRes,
    status: 201,
  })
  @Put()
  update(@Body() body: RecordDto): Promise<Record> {
    return this.service.update(body);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    summary: '查询所有record',
    description: '查询所有record',
  })
  @ApiResponse({
    status: 200,
    description: 'record分页',
    type: RecordPageRes,
  })
  @Get()
  findAll(@Query() query: PageDto) {
    return this.service.findAll(query);
  }

  @Get('/all')
  findAllWithDelete(): Promise<Record[]> {
    return this.service.findAllWithDelete();
  }

  @ApiOperation({
    summary: '根据id查询record',
    description: '根据id查询record',
  })
  @ApiResponse({
    status: 200,
    description: 'record',
    type: RecordRes,
  })
  @Get(':id')
  find(@Param('id') id: string): Promise<Record> {
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
