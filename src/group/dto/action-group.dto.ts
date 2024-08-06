import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { Match } from '../../common/decorators/match.decorator';

export class actionGroupDto {

  @ApiProperty({
    example: 'DEP001',
    description: '',
  })
  @IsNotEmpty()
  @MaxLength(11)
  readonly code: string;


  @ApiProperty({
    example: 'nhóm phát triển',
    description: '',
  })
  @IsNotEmpty()
  @MaxLength(255)
  readonly name: string;

  @ApiProperty({
    example: 'sân golf dragon đồ sơn',
    description: '',
  })
  @MaxLength(255)
  readonly description: string;




}
