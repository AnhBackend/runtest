import {Param, Body, Controller, Get, Post,Put } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ActiveUser } from '../common/decorators/active-user.decorator';
import { Branch } from './entities/branch.entity';
import { BranchService } from './branch.service';
import { actionBranchDto } from '../branch/dto/action-branch.dto';
import { actionBranchManagerDto } from '../branch/dto/action-branch-manager.dto';

@ApiTags('branch')
@Controller('api/branch')
export class BranchController {
    constructor(private readonly branchService: BranchService) {
    }
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiConflictResponse({
        description: 'code already exists',
    })
    @ApiBearerAuth()
    @Post('/create')
    create(@Body() actionBranchDto: actionBranchDto): Promise<void> {
        return this.branchService.create(actionBranchDto);
    }

    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiConflictResponse({
        description: 'code already exists',
    })
    @ApiBearerAuth()
    @Put('/update/:id')
    update( @Param('id') id:number, @Body() actionBranchDto: actionBranchDto): Promise<void> {
        return this.branchService.update(id, actionBranchDto);
    }

    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiConflictResponse({
        description: 'code already exists',
    })
    @ApiBearerAuth()
    @Post('/users/manager/add')
    addUsersManager(@Body() actionBranchManagerDto: actionBranchManagerDto): Promise<void> {
        return this.branchService.addManager(actionBranchManagerDto);
    }

}
