import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsEmail,
    IsNotEmpty,
    Matches,
    MaxLength,
    MinLength, ValidateNested,
} from 'class-validator';

import { Match } from '../../common/decorators/match.decorator';
import { Type } from 'class-transformer';
export class ActionRoleRelationshipsDto {
    @ApiProperty({
        example: [
            {
                controllerId : 1,
                actionId : 2,
                userId:3,
                roleId:4,
            },
        ],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => RoleItemRelationshipDto)
    param: RoleItemRelationshipDto[];
}
export class RoleItemRelationshipDto{
    @ApiProperty({
        example: 'number',
        description: '',
    })
    readonly controllerId: number;

    @ApiProperty({
        example: 'number',
        description: '',
    })
    readonly actionId: number;

    @ApiProperty({
        example: 'number',
        description: '',
    })
    @IsNotEmpty()
    readonly roleId: number;

    @ApiProperty({
        example: 'number',
        description: '',
    })
    @IsNotEmpty()
    readonly userId: number;

    @ApiProperty({
        example: 'boolean',
        description: '',
    })
    readonly isActive: boolean;
}
