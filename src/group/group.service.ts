import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Group } from './entities/group.entity';
import { GroupManager } from './entities/group-manager.entity';
import { GroupUser } from './entities/group-user.entity';
import {actionGroupDto} from './dto/action-group.dto';
import {actionGroupManagerDto} from './dto/action-group-manager.dto';
import { MysqlErrorCode } from '../common/enums/error-codes.enum';
import { actionGroupUserDto } from './dto/action-group-user.dto';
import { ServiceValidation } from '../common/validation/service.validation';

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(Group)
        private readonly groupRepository: Repository<Group>,
        @InjectRepository(GroupManager)
        private readonly groupManagerRepository: Repository<GroupManager>,
        @InjectRepository(GroupUser)
        private readonly groupUserRepository:Repository<GroupUser>,
        private readonly serviceValidation: ServiceValidation,
    ) {
    }

    async getById(id: number): Promise<Group> {
        const group = await this.groupRepository.findOne({
            where: {
                id: id,
            },
        });
        if (!group) {
            throw new BadRequestException('branch not found');
        }
        return group;
    }
    async create(actionGroupDto:actionGroupDto){
        const {code,name,description,} = actionGroupDto;
        try {
            const body = new Group();
            body.code = code;
            body.name = name;
            body.description = description;
            await this.groupRepository.save(body);
        } catch (error) {

            if (error.code == MysqlErrorCode.UniqueViolationPg) {
                throw new ConflictException(`branch code ${code} already exist`);
            }
            throw error;
        }
    }

    async update(id:number,body:actionGroupDto){
        const {code,name,description,} = body;
        try {
            const body = new Group();
            body.code = code;
            body.name = name;
            body.description = description;
            await this.groupRepository.update(id,body);
        } catch (error) {
            if (error.code == MysqlErrorCode.UniqueViolationPg) {
                throw new ConflictException(`branch code ${code} already exist`);
            }
            throw error;
        }
    }

    async addManager(body:actionGroupManagerDto){
        const {groupId,userId} = body;
        const isUser = await this.serviceValidation.isUser(body.userId);
        const isGroup = await this.serviceValidation.isGroup(body.branchId);
        if (!isUser){
            throw new BadRequestException(`users does not exist`);
        }
        if (!isGroup){
            throw new BadRequestException(`branch does not exist`);
        }

        try {
            const body = new GroupManager();
            body.group_id = groupId;
            body.user_id = userId;
            await this.groupManagerRepository.save(body);
        } catch (error) {
            throw error;
        }
    }
    async addUserGroup(body:actionGroupUserDto){
        const {groupId,userId} = body;
        const isUser = await this.serviceValidation.isUser(body.userId);
        const isGroup = await this.serviceValidation.isGroup(body.groupId);
        if (!isUser){
            throw new BadRequestException(`users does not exist`);
        }
        if (!isGroup){
            throw new BadRequestException(`branch does not exist`);
        }
        try {
            const body = new GroupManager();
            body.group_id = groupId;
            body.user_id = userId;
            await this.groupUserRepository.save(body);
        } catch (error) {
            throw error;
        }
    }

}
