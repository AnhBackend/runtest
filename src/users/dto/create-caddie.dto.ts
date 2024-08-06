import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { Match } from '../../common/decorators/match.decorator';

export class SignUpCaddieDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'atest@email.com',
    description: 'Email of user',
  })
  readonly email: string;

  @ApiProperty({
    example: '1234',
    description: 'code Caddie : ',
  })
  readonly codeCaddie: string;

  @ApiProperty({
    example: '0968947921',
    description: 'mobile ',
  })
  readonly mobile: string;

  @ApiProperty({
    example: 'tran xuan phi',
    description: 'full name caddie : ',
  })
  readonly fullName: string;

  @ApiProperty({
    example: 'nam',
  })
  readonly gender: string;

  @ApiProperty({
    example: 'ngày sinh',
  })
  readonly birthday: Date;

  @ApiProperty({
    example: 'ngày vào làm việc',
  })
  readonly workingday: Date;
}
