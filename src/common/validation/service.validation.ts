import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Branch } from '../../branch/entities/branch.entity';
import { Group } from '../../group/entities/group.entity';
import { User } from '../../users/entities/user.entity';
import { plainToInstance } from 'class-transformer';


@Injectable()
export class ServiceValidation {
    constructor(
        @InjectRepository(Branch)
        private readonly branchRepository: Repository<Branch>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Group)
        private readonly groupRepository: Repository<Group>,
    ) {
    }

    isUser = async (id:number) => {
        const userId = await this.userRepository.findOne({
            where: {
                id: id,
            },
        });
        if (!userId) {
            return false;
        }
        return true;
    }
    isBranch = async (id:number) => {
        const branchId = await this.branchRepository.findOne({
            where: {
                id: id,
            },
        });
        if (!branchId) {
            return false;
        }
        return true;
    }

    isGroup = async (id:number)=> {
        const groupId = await this.groupRepository.findOne({
            where:{
                id:id,
            }
        })
        if (!groupId){
            return false;
        }
        return true;
    }
}
