import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { Match } from '../../common/decorators/match.decorator';

export class SignUpDto {

  @ApiProperty({
    example: 'phitx@gmail.com',
  })
  readonly email: string;

  @ApiProperty({
    example: 'Trần Xuân Phi',
  })
  readonly fullName: string;

  @ApiProperty({
    example: 'caddie',
  })
  readonly type: string;

  @ApiProperty({
    example: '1',
  })
  readonly roleId: number;

  @ApiProperty({
    example: '1',
  })
  readonly isAdmin: number;

  @ApiProperty({
    example: 'tranphi9669',
    description: 'username login',
  })
  @MaxLength(255)
  @IsNotEmpty()
  readonly userName: string;

  @ApiProperty({
    description: 'Password of user',
    example: 'Pass#123',
  })
  @MinLength(8, {
    message: 'password too short',
  })
  @MaxLength(20, {
    message: 'password too long',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({
    description: 'Repeat same value as in password field',
    example: 'Pass#123',
  })
  @Match('password')
  @IsNotEmpty()
  readonly passwordConfirm: string;

  @ApiProperty({
    example: '0987654321',
  })
  @IsNotEmpty()
  readonly mobile: string;

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
