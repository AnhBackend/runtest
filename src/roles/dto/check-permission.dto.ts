import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

import { Match } from '../../common/decorators/match.decorator';

export class checkPermission {
    @ApiProperty({
        example: 'class',
        description: '',
    })
    @MaxLength(100)
    readonly classModule: string;

    @ApiProperty({
        example: 'method',
        description: '',
    })
    @MaxLength(100)
    readonly method: string;

    @ApiProperty({
        example: 'roleId',
        description: '',
    })
    @IsNotEmpty()
    readonly roleId: number;

    @ApiProperty({
        example: 'userId',
        description: '',
    })
    @IsNotEmpty()
    readonly userId: number;
}
