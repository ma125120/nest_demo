import { IsNotEmpty } from 'class-validator'
import { ProjectCate } from '@/projectCate/projectCate.entity'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { PageDto } from '@/common/types/page.dto'

export class CreateCateResourceDto {
	id?: number

	@ApiProperty({ description: '图片地址' })
	@IsNotEmpty()
	url: string
	// @ApiProperty({ description: '新建时需要用到的，不会返回' })
	// fileList: string[]

	@ApiProperty({ description: '所属种类的id' })
	@IsNotEmpty()
	cateId: string

	@ApiProperty({ description: '项目名称' })
	@IsNotEmpty()
	name: string

	@ApiProperty({ description: '项目时间' })
	@IsNotEmpty()
	date: string

	@ApiPropertyOptional({ description: '项目时间字符串，返回参数，无需上传' })
	dateStr?: string

	@ApiProperty({ description: '项目描述' })
	@IsNotEmpty()
	desc: string

	note?: string
	@ApiPropertyOptional({ description: '所属种类' })
	cate?: ProjectCate

	// @ApiPropertyOptional({
	//   description: '页数',
	//   minimum: 1,
	//   default: 1,
	// })
	// pages?: number = 1;
}

export class PageResourceDto extends PageDto {
	@ApiProperty({ description: '所属种类的id' })
	cateId?: string
}

export class CateResourceDto extends CreateCateResourceDto {
	id: number
}
