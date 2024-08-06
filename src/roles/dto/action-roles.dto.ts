import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { Match } from '../../common/decorators/match.decorator';

export class ActionRolesDto {
  @ApiProperty({
    example: 'code',
    description: '',
  })
  readonly code: string;

  @ApiProperty({
    example: 'name',
    description: '',
  })
  readonly name: string;

  @ApiProperty({
    example: 'true',
    description: '',
  })
  readonly isActive: boolean;

  @ApiProperty({
    example: '1',
    description: '',
  })
  readonly isAdmin: number;

  @ApiProperty({
    example: '1',
    description: '',
  })
  readonly isSelectOption: number;

  @ApiProperty({
    example: 'isUser',
    description: '',
  })
  @MaxLength(11)
  readonly isUser: number;

}
