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

export class actionModuleDto {

  @ApiProperty({
    example: 'system',
    description: '',
  })
  @IsNotEmpty()
  readonly code: string;

  @ApiProperty({
    example: 'Hệ thống',
    description: '',
  })
  @IsNotEmpty()
  readonly name: string;
}
