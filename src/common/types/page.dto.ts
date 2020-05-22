import { FindManyOptions } from 'typeorm'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class PageDto {
	@ApiPropertyOptional({ description: '页数' })
	current?: number

	@ApiPropertyOptional({ description: '每一页的大小' })
	size?: number;
	[key: string]: any
}

export class CityPageDto extends PageDto {
	cityId?: number
}

export const toPage = (params: PageDto, conditions: FindManyOptions = {}) =>
	({
		take: params.size || 10,
		skip: ((params.current || 1) - 1) * params.size,
		...conditions,
	} as FindManyOptions)
