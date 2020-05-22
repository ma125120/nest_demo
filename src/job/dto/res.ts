
import { ApiProperty } from "@nestjs/swagger";
import { JobDto } from "./index.dto";
import { BaseRes } from '../../common/types/base'

export class JobRes extends BaseRes {
  @ApiProperty({ description: '返回的数据', type: JobDto })
  data: JobDto;
}

export class JobArrRes extends BaseRes {
  @ApiProperty({ description: '返回的数据', type: [JobDto] })
  data: JobDto[];
}

class BasePage {
  @ApiProperty({ description: '结果集', type: [JobDto] })
  records: JobDto[];

  @ApiProperty({ description: '总数', })
  total: number;
}
export class JobPageRes extends BaseRes {
  @ApiProperty({ description: '返回的数据', type: BasePage })
  data: {
    records: JobDto[],
    total: number,
  };
}
