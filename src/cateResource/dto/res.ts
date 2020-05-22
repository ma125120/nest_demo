import { ApiProperty } from '@nestjs/swagger'
import { CateResourceDto } from './index.dto'
import { BaseRes } from '../../common/types/base'

export class CateResourceRes extends BaseRes {
	@ApiProperty({ description: '返回的数据', type: CateResourceDto })
	data: CateResourceDto
}

export class CateResourceArrRes extends BaseRes {
	@ApiProperty({ description: '返回的数据', type: [CateResourceDto] })
	data: CateResourceDto[]
}

class CateResourceBasePage {
	@ApiProperty({ description: '结果集', type: [CateResourceDto] })
	records: CateResourceDto[]

	@ApiProperty({ description: '总数' })
	total: number
}
export class CateResourcePageRes extends BaseRes {
	@ApiProperty({
		description: '返回的数据',
		type: CateResourceBasePage,
	})
	data: {
		records: CateResourceDto[]
		total: number
	}
}
