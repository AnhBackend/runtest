import {Param, Body, Controller, Get, Post,Put } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Group } from './entities/group.entity';
import { GroupService } from './group.service';
import { actionGroupDto } from './dto/action-group.dto';
import { actionGroupUserDto } from './dto/action-group-user.dto';
import { actionGroupManagerDto } from './dto/action-group-manager.dto';
import { actionDepartmentGroupDto } from './dto/action-department-group.dto';


@ApiTags('group')
@Controller('api/group')
export class GroupController {
    constructor(private readonly groupService: GroupService) {
    }
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiConflictResponse({
        description: 'code already exists',
    })
    @ApiBearerAuth()
    @Post('/create')
    create(@Body() actionGroupDto: actionGroupDto): Promise<void> {
        return this.groupService.create(actionGroupDto);
    }

    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiConflictResponse({
        description: 'code already exists',
    })
    @ApiBearerAuth()
    @Put('/update/:id')
    update( @Param('id') id:number, @Body() actionGroupDto: actionGroupDto): Promise<void> {
        return this.groupService.update(id, actionGroupDto);
    }

    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiBearerAuth()
    @Post('/manager/add')
    addManager(@Body() actionGroupManagerDto:actionGroupManagerDto): Promise<void>{
        return this.groupService.addManager(actionGroupManagerDto);
    }

    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiBearerAuth()
    @Post('/user/add')
    addUsersToGroup(@Body() actionGroupUserDto:actionGroupUserDto): Promise<void>{
        return this.groupService.addUserGroup(actionGroupUserDto);
    }

}
