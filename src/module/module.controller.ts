import {Param, Body, Controller, Get, Post,Put } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ActiveUser } from '../common/decorators/active-user.decorator';
import { ModuleService } from './module.service';
import { actionModuleDto } from '../module/dto/action-module.dto';
import { actionBranchManagerDto } from '../branch/dto/action-branch-manager.dto';

@ApiTags('module')
@Controller('api/module')
export class ModuleController {
    constructor(private readonly branchService: ModuleService) {
    }
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiConflictResponse({
        description: 'code already exists',
    })
    @ApiBearerAuth()
    @Post('/create')
    create(@Body() actionModuleDto: actionModuleDto): Promise<void> {
        return this.branchService.create(actionModuleDto);
    }
    @ApiBearerAuth()
    @Get('/getAll')
    getAllModule(): Promise<void> {
        return this.branchService.getAllModule();
    }


}
