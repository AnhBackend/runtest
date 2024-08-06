import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    Matches,
    MaxLength,
    MinLength,
    min,
    max,
    IsInt
} from 'class-validator';

import { Match } from '../../common/decorators/match.decorator';

export class CreateCaddieScoreDto {

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
    @IsNotEmpty()
    @MaxLength(11)
    readonly userId: number;

    @ApiProperty({
        example: 'string',
        description: '',
    })
    @MaxLength(255)
    readonly note: string;

    @ApiProperty({
        example: 'string',
        description: '',
    })
    @MaxLength(255)
    readonly lto: string;

    @ApiProperty({
        example: 'number',
        description: '',
    })
    @IsInt()
    readonly score: number;

}
