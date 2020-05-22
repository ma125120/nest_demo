import { IsNotEmpty } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateRecordDto {
	@ApiProperty({ description: '姓名' })
	@IsNotEmpty()
	name: string

	@ApiProperty({ description: '电话' })
	@IsNotEmpty()
	tel: string

	@ApiProperty({ description: '留言' })
	@IsNotEmpty()
	content: string

	@ApiProperty({ description: '城市id' })
	@IsNotEmpty()
	cityId: number

	@ApiPropertyOptional({
		description: '是否已读，默认0，后台使用，前端无需传入',
	})
	read?: number
	city?: string
	hasRead?: string
	note?: string

	// @ApiPropertyOptional({
	//   description: '页数',
	//   minimum: 1,
	//   default: 1,
	// })
	// pages?: number = 1;
}

export class RecordDto extends CreateRecordDto {
	id: number
}
