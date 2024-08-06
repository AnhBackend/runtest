import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

import { Match } from '../../common/decorators/match.decorator';

export class ActionRolesControllerDto {

    @ApiProperty({
        example: 'moduleId',
        description: '',
    })
    readonly moduleId: number;

    @ApiProperty({
        example: 'parentId',
        description: '',
    })
    readonly parentId: number;


    @ApiProperty({
        example: 'name',
        description: '',
    })
    @MaxLength(255)
    readonly name: string;

    @ApiProperty({
        example: 'description',
        description: '',
    })
    readonly description: string;

    @ApiProperty({
        example: 'isActive',
        description: '',
    })
    readonly isActive: boolean;

    @ApiProperty({
        example: 'isAdmin',
        description: '',
    })
    readonly isAdmin: number;

    @ApiProperty({
        example: 'isUser',
        description: '',
    })
    readonly isUser: number;

}
