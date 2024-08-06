import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

import { Match } from '../../common/decorators/match.decorator';

export class ActionRoleRelationshipDto {
    @ApiProperty({
        example: 'controllerId',
        description: '',
    })
    readonly controllerId: number;

    @ApiProperty({
        example: 'actionId',
        description: '',
    })
    readonly actionId: number;

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

    @ApiProperty({
        example: 'isActive',
        description: '',
    })
    readonly isActive: boolean;
}
