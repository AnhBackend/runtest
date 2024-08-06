import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import moment from 'moment';
import { Between,Repository,createQueryBuilder } from 'typeorm';

import { User } from '../../users/entities/user.entity';

export class userHelper{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
    }
    async isSelectOption(userId:number): Promise<{}> {
        const isSelectOption = await this.userRepository.query(`
            select sr.* from sys_users su
            join sys_role sr on su.role_id = sr.id
            where su.id  = $1
        `,[userId]);
        return isSelectOption;
    }
    async getRoleName(userId:number): Promise<{code:string,name:string}> {
        const roleName = await this.userRepository.query(`
            select ro.code,ro.name from sys_role ro
            join sys_users us on us.role_id = ro.id
            where us.id  = $1
        `,[userId]);
        return roleName;
    }
}