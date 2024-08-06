import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

import { Match } from '../../common/decorators/match.decorator';

export class CreateCaddieBookingDto {

    @ApiProperty({
        example: '1234',
        description: 'code Caddie : ',
    })
    @MaxLength(11)
    @IsNotEmpty()
    readonly codeCaddie: string;

    @ApiProperty({
        example: 'string',
        description: '',
    })
    readonly userId: number;

    readonly totalBooking: number;

}
