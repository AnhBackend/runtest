import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  notEquals,
  MinLength
} from 'class-validator';

import { Match } from '../../common/decorators/match.decorator';

export class actionBranchDto {
  @ApiProperty({
    example: '30',
    description: 'Hà Nội',
  })

  readonly cityId: number;

  @ApiProperty({
    example: 'HNI',
    description: '',
  })
  @IsNotEmpty()
  readonly code: string;


  @ApiProperty({
    example: 'Hà Nội',
    description: '',
  })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: 'sân golf dragon đồ sơn',
    description: '',
  })
  readonly description: string;

  @ApiProperty({
    example: 'Đảo Vũ Yên, Nguyễn Bỉnh Khiêm, Đông Hải 2, Hải An, Hải Phòng ',
    description: '',
  })
  readonly address: string;
}
