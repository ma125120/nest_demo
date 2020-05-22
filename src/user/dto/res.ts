
import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from "./index.dto";
import { BaseRes } from '../../common/types/base'

export class UserRes extends BaseRes {
  @ApiProperty({ description: '返回的数据', type: UserDto })
  data: UserDto;
}

export class UserArrRes extends BaseRes {
  @ApiProperty({ description: '返回的数据', type: [UserDto] })
  data: UserDto[];
}

class BasePage {
  @ApiProperty({ description: '结果集', type: [UserDto] })
  records: UserDto[];

  @ApiProperty({ description: '总数', })
  total: number;
}
export class UserPageRes extends BaseRes {
  @ApiProperty({ description: '返回的数据', type: BasePage })
  data: {
    records: UserDto[],
    total: number,
  };
}

