import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

import { Match } from '../../common/decorators/match.decorator';

export class actionGroupManagerDto {

    @ApiProperty({
        example: 'number',
        description: '',
    })
    @IsNotEmpty()
    readonly branchId: number;

    @ApiProperty({
        example: 'number',
        description: '',
    })
    @IsNotEmpty()
    readonly departmentId: number;

    @ApiProperty({
        example: 'number',
        description: '',
    })
    @IsNotEmpty()
    @MaxLength(11)
    readonly groupId: number;

    @ApiProperty({
        example: 'number',
        description: '',
    })
    @IsNotEmpty()
    @MaxLength(11)
    readonly userId: number;

}
