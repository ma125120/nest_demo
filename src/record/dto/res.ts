
import { ApiProperty } from "@nestjs/swagger";
import { RecordDto } from "./index.dto";
import { BaseRes } from '../../common/types/base'

export class RecordRes extends BaseRes {
  @ApiProperty({ description: '返回的数据', type: RecordDto })
  data: RecordDto;
}

export class RecordArrRes extends BaseRes {
  @ApiProperty({ description: '返回的数据', type: [RecordDto] })
  data: RecordDto[];
}

class BasePage {
  @ApiProperty({ description: '结果集', type: [RecordDto] })
  records: RecordDto[];

  @ApiProperty({ description: '总数', })
  total: number;
}
export class RecordPageRes extends BaseRes {
  @ApiProperty({ description: '返回的数据', type: BasePage })
  data: {
    records: RecordDto[],
    total: number,
  };
}
