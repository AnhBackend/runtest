import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse,
  ApiOkResponse, ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ActiveUser } from '../common/decorators/active-user.decorator';
import { RolesService } from './roles.service';
import moment from 'moment/moment';
import { Public } from '../common/decorators/public.decorator';
import { checkPermission } from './dto/check-permission.dto';
import { ActionRoleRelationshipsDto } from './dto/action-role-relationships.dto';
import { ActionRolesDto } from './dto/action-roles.dto';
import { ActionRolesModuleDto } from './dto/action-roles-module.dto';
import { ActionRolesControllerDto } from './dto/action-roles-controller.dto';
import { ActionRolesActionDto } from './dto/action-roles-action.dto';
@ApiTags('roles')
@Controller('api/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Public()
  @Post('/check-permission')
  checkPermission(@Body() checkPermission: checkPermission): Promise<{statusCode:number,data:any}> {
    return this.rolesService.checkPermission(checkPermission);
  }

  @Public()
  @Post('/create-permission')
  createPermission(@Body() ActionRoleRelationshipsDto: ActionRoleRelationshipsDto): Promise<any> {
    return this.rolesService.createRolePermission(ActionRoleRelationshipsDto);
  }

  @Post('/create-roles')
  createRoles(@Body() ActionRolesDto: ActionRolesDto): Promise<any> {
    return this.rolesService.createRole(ActionRolesDto);
  }

  @Post('/create-roles-modules')
  createRolesModules(@Body() ActionRolesModuleDto: ActionRolesModuleDto): Promise<any> {
    return this.rolesService.createRoleModule(ActionRolesModuleDto);
  }

  @Post('/create-roles-controllers')
  createRolesController(@Body() ActionRolesDto: ActionRolesControllerDto): Promise<any> {
    return this.rolesService.createRoleController(ActionRolesDto);
  }
  @Post('/create-roles-actions')
  createRolesAction(@Body() ActionRolesDto: ActionRolesActionDto): Promise<any> {
    return this.rolesService.createRoleAction(ActionRolesDto);
  }


  @ApiBearerAuth()
  @ApiQuery({ name: 'page', description: 'Số trang', type: 'number', example: 1, required: false })
  @ApiQuery({ name: 'limit', description: 'Số row dữ liệu lấy về 1 trang', type: 'number', example: 10, required: false })
  @Get('list/controller')
  getAllController(
      @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
      @Query('limit', new DefaultValuePipe(9999999), ParseIntPipe) limit = 9999999,
  ) {
    return this.rolesService.getAllController({ page, limit }, {});
  }

  @ApiBearerAuth()
  @ApiQuery({ name: 'page', description: 'Số trang', type: 'number', example: 1, required: false })
  @ApiQuery({ name: 'limit', description: 'Số row dữ liệu lấy về 1 trang', type: 'number', example: 10, required: false })
  @Get('list/action')
  getAllAction(
      @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
      @Query('limit', new DefaultValuePipe(9999999), ParseIntPipe) limit = 9999999,
  ) {
    return this.rolesService.getAllAction({ page, limit }, {});
  }

  @ApiBearerAuth()
  @ApiQuery({ name: 'page', description: 'Số trang', type: 'number', example: 1, required: false })
  @ApiQuery({ name: 'limit', description: 'Số row dữ liệu lấy về 1 trang', type: 'number', example: 10, required: false })
  @Get('list/roles')
  getAllRoles(
      @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
      @Query('limit', new DefaultValuePipe(9999999), ParseIntPipe) limit = 9999999,
  ) {
    return this.rolesService.getAllRoles({ page, limit }, {});
  }

  @ApiBearerAuth()
  @ApiQuery({ name: 'page', description: 'Số trang', type: 'number', example: 1, required: false })
  @ApiQuery({ name: 'limit', description: 'Số row dữ liệu lấy về 1 trang', type: 'number', example: 10, required: false })
  @Get('list/module')
  getAllModule(
      @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
      @Query('limit', new DefaultValuePipe(9999999), ParseIntPipe) limit = 9999999,
  ) {
    return this.rolesService.getAllModule({ page, limit }, {});
  }
}
