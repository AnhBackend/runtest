import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

import { Match } from '../../common/decorators/match.decorator';

export class ActionRolesModuleDto {
    @ApiProperty({
        example: 'code',
        description: '',
    })
    @MaxLength(255)
    readonly code: string;

    @ApiProperty({
        example: 'name',
        description: '',
    })
    @MaxLength(255)
    readonly name: string;

}
