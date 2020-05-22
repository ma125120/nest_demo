import { ApiProperty } from '@nestjs/swagger'
import { ProjectCateDto } from './index.dto'
import { BaseRes } from '../../common/types/base'

export class ProjectCateRes extends BaseRes {
	@ApiProperty({ description: '返回的数据', type: ProjectCateDto })
	data: ProjectCateDto
}

export class ProjectCateArrRes extends BaseRes {
	@ApiProperty({ description: '返回的数据', type: [ProjectCateDto] })
	data: ProjectCateDto[]
}

class BasePage1 {
	@ApiProperty({ description: '结果集', type: [ProjectCateDto] })
	records: ProjectCateDto[]

	@ApiProperty({ description: '总数' })
	total: number
}

export class ProjectCatePageRes extends BaseRes {
	@ApiProperty({ description: '返回的数据', type: BasePage1 })
	data: {
		records: ProjectCateDto[]
		total: number
	}
}
