import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateProjectCateDto {
	@ApiProperty({ description: '种类标题' })
	@IsNotEmpty()
	title: string

	@ApiProperty({ description: '种类描述' })
	@IsNotEmpty()
	desc: string

	@ApiProperty({ description: '种类名称' })
	@IsNotEmpty()
	name: string

	note?: string

	// @ApiPropertyOptional({
	//   description: '页数',
	//   minimum: 1,
	//   default: 1,
	// })
	// pages?: number = 1;
}

export class ProjectCateDto extends CreateProjectCateDto {
	id: number
}
