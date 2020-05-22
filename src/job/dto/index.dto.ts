import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateJobDto {
	@ApiProperty({ description: '职位名称' })
	@IsNotEmpty()
	name?: string

	@ApiProperty({ description: '职位描述,html' })
	@IsNotEmpty()
	content?: string

	@ApiProperty({ description: '所属城市id' })
	@IsNotEmpty()
	cityId?: number

	// @ApiPropertyOptional({
	//   description: '页数',
	//   minimum: 1,
	//   default: 1,
	// })
	// pages?: number = 1;
}

export class QueryById {
	cityId?: number
}

export class JobDto extends CreateJobDto {
	id: number
}
