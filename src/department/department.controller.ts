import {Param, Body, Controller, Get, Post,Put } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Department } from './entities/department.entity';
import { DepartmentService } from './department.service';
import { actionDepartmentDto } from './dto/action-department.dto';
import { actionDepartmentManagerDto } from './dto/action-department-manager.dto';
import { actionBranchDepartmentDto } from './dto/action-branch-department.dto';

@ApiTags('department')
@Controller('api/department')
export class DepartmentController {
    constructor(private readonly departmentService: DepartmentService) {
    }
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiConflictResponse({
        description: 'code already exists',
    })
    @ApiBearerAuth()
    @Post('/create')
    create(@Body() actionBranchDto: actionDepartmentDto): Promise<any> {
        return this.departmentService.create(actionBranchDto);
    }

    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiConflictResponse({
        description: 'code already exists',
    })
    @ApiBearerAuth()
    @Put('/update/:id')
    update( @Param('id') id:number, @Body() actionBranchDto: actionDepartmentDto): Promise<any> {
        return this.departmentService.update(id, actionBranchDto);
    }

}
