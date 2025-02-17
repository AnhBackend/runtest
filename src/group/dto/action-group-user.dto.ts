import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

import { Match } from '../../common/decorators/match.decorator';

export class actionGroupUserDto {

    @ApiProperty({
        example: 'string',
        description: '',
    })
    @IsNotEmpty()
    @MaxLength(11)
    readonly branchId: number;

    @ApiProperty({
        example: 'string',
        description: '',
    })
    @IsNotEmpty()
    @MaxLength(11)
    readonly departmentId: number;

    @ApiProperty({
        example: 'string',
        description: '',
    })
    @IsNotEmpty()
    @MaxLength(11)
    readonly groupId: number;

    @ApiProperty({
        example: 'string',
        description: '',
    })
    @IsNotEmpty()
    @MaxLength(11)
    readonly userId: number;

}
