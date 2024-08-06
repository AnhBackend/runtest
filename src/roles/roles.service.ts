import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { Roles } from './entities/roles.entity';
import { RolesModule } from './entities/roles-module.entity';
import { RolesControllers } from './entities/roles-controller.entity';
import { RolesAction } from './entities/roles-action.entity';
import { RolesRelationship } from './entities/role-relationship.entity';
import { ActionRolesDto } from './dto/action-roles.dto';
import { ActionRolesModuleDto } from './dto/action-roles-module.dto';
import { ActionRolesControllerDto } from './dto/action-roles-controller.dto';
import { ActionRolesActionDto } from './dto/action-roles-action.dto';
import { checkPermission } from './dto/check-permission.dto';
import { ActionRoleRelationshipsDto } from './dto/action-role-relationships.dto';
import { MysqlErrorCode } from '../common/enums/error-codes.enum';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { User } from '../users/entities/user.entity';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Roles)
        private readonly rolesRepository: Repository<Roles>,
        @InjectRepository(RolesModule)
        private readonly rolesModuleRepository: Repository<RolesModule>,
        @InjectRepository(RolesControllers)
        private readonly rolesControllersRepository: Repository<RolesControllers>,
        @InjectRepository(RolesAction)
        private readonly rolesActionRepository: Repository<RolesAction>,
        @InjectRepository(RolesRelationship)
        private readonly rolesRelationshipRepository: Repository<RolesRelationship>,
    ) {
    }

    async createRole(createRoles: ActionRolesDto){
        const {name,code,isAdmin,isActive} = createRoles;
        try {
            const body = new Roles();
            body.name       = name;
            body.code       = code.toUpperCase();
            body.is_admin    = isAdmin;
            body.is_active   = isActive;
            await this.rolesRepository.save(body);
            throw new HttpException(`Thành công`, HttpStatus.OK);
        }catch (e) {
            if (e.code === MysqlErrorCode.UniqueViolationPg) {
                throw new HttpException(`Roles [${code}] already exist`, HttpStatus.BAD_REQUEST);
            }
            throw e;
        }
    }
    async createRoleModule(createRolesModule: ActionRolesModuleDto){
        const {name,code} = createRolesModule;
        try {
            const body = new RolesModule();
            body.name       = name;
            body.code       = code;
            await this.rolesModuleRepository.save(body);
        }catch (e) {
            if (e.code === MysqlErrorCode.UniqueViolationPg) {
                throw new HttpException(`Roles [${code}] already exist`, HttpStatus.BAD_REQUEST);
            }
            throw e;
        }
    }
    async createRoleController(createRolesController: ActionRolesControllerDto){
        const { name,parentId,moduleId,description,isActive,isAdmin } = createRolesController;
        try {
            const body = new RolesControllers();
            body.module_id = moduleId;
            body.parent_id = parentId;
            body.name = name;
            body.description = description;
            body.is_admin = isAdmin;
            body.is_active = isActive;
            await this.rolesControllersRepository.save(body);
            throw new HttpException(`Thành công`, HttpStatus.OK);
        }catch (e) {
            throw e;
        }
    }
    async createRoleAction(createRolesAction: ActionRolesActionDto){
        const { name,description,controllerId,isUser,isAdmin,isActive} = createRolesAction;
        try {
            const body = new RolesAction();
            body.controller_id = controllerId;
            body.name = name;
            body.description = description;
            body.is_admin = isAdmin;
            body.is_active = isActive;
            body.is_user = isUser;
            await this.rolesActionRepository.save(body);
            throw new HttpException(`Thành công`, HttpStatus.OK);
        }catch (e) {
            throw e;
        }
    }

    async createRolePermission(createRolesRelationship: ActionRoleRelationshipsDto){
        const param = createRolesRelationship.param
        try {
            await Promise.all(param.map(async item => {
                const body = new RolesRelationship();
                body.controller_id = item.controllerId;
                body.action_id = item.actionId;
                body.user_id = item.userId;
                body.role_id = item.roleId;
                body.is_active = true;
                await this.rolesRelationshipRepository.save(body);
            }));
            throw new HttpException(`Thành công`, HttpStatus.OK);
        }catch (e) {
            throw e;
        }
    }

    async checkPermission(checkPermission: checkPermission){
        const { roleId,userId,method,classModule } = checkPermission;
        const ctlDetail = await this.rolesControllersRepository.findOne({
            where:{
                name:classModule,
                is_active: true
            }
        })

        if (ctlDetail){
            const controllerId = ctlDetail.id;
            const acDetail = await this.rolesActionRepository.findOne({
                where:{
                    name:method,
                    controller_id:controllerId,
                    is_active: true
                }
            })
            if (acDetail){
                const actionId = acDetail.id;
                const pmsDetail = await this.rolesRelationshipRepository.findOne({
                    where:{
                        action_id:actionId,
                        controller_id:controllerId,
                        user_id:userId,
                        role_id:roleId,
                        is_active: true
                    }
                })
                if (pmsDetail){
                    return {
                        'statusCode': 200,
                        'data': {
                            'permission':true
                        }
                    }
                }
            }
        }
        return {
            'statusCode': 400,
            'data': {
                'permission': false
            }
        }

    }
    async getAllController(options: IPaginationOptions, findOption:  FindOptionsWhere<RolesControllers>){
        const queryBuilder = this.rolesControllersRepository.createQueryBuilder('controller')
        const data = await paginate<RolesControllers>(queryBuilder, options);
        throw new HttpException(data, HttpStatus.OK);
    }
    async getAllAction(options: IPaginationOptions, findOption:  FindOptionsWhere<RolesAction>){
        const queryBuilder = this.rolesActionRepository.createQueryBuilder('action')
        const data = await paginate<RolesAction>(queryBuilder, options);
        throw new HttpException(data, HttpStatus.OK);
    }
    async getAllRoles(options: IPaginationOptions, findOption:  FindOptionsWhere<Roles>){
        const queryBuilder = this.rolesRepository.createQueryBuilder('action')
        const data = await paginate<Roles>(queryBuilder, options);
        throw new HttpException(data, HttpStatus.OK);
    }

    async getAllModule(options: IPaginationOptions, findOption:  FindOptionsWhere<RolesModule>){
        const queryBuilder = this.rolesModuleRepository.createQueryBuilder('action')
        const data = await paginate<RolesModule>(queryBuilder, options);
        throw new HttpException(data, HttpStatus.OK);
    }
}
