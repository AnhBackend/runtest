import { BadRequestException, ConflictException, Injectable,HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ModuleEntity } from './entities/module.entity';
import {actionModuleDto} from './dto/action-module.dto';
import { MysqlErrorCode } from '../common/enums/error-codes.enum';
import { ServiceValidation } from '../common/validation/service.validation';

@Injectable()
export class ModuleService {
    constructor(
        @InjectRepository(ModuleEntity)
        private readonly moduleEntityRepository: Repository<ModuleEntity>,
    ) {
    }

    async getBranchById(brachId: number): Promise<ModuleEntity> {
        const branch = await this.moduleEntityRepository.findOne({
            where: {
                id: brachId,
            },
        });
        if (!branch) {
            throw new HttpException('branch not found', HttpStatus.BAD_REQUEST);
        }
        return branch;
    }
    async create(actionBranchDto:actionModuleDto){
        const {code,name,} = actionBranchDto;
        try {
            const module = new ModuleEntity();
            module.code = code;
            module.name = name;
            await this.moduleEntityRepository.save(module);
            throw new HttpException(`Thành Công`, HttpStatus.OK);
        } catch (error) {

            if (error.code == MysqlErrorCode.UniqueViolationPg) {
                throw new HttpException(`branch code ${code} already exist`, HttpStatus.BAD_REQUEST);
            }
            throw error;
        }
    }
    async getAllModule(){
        const module =  await this.moduleEntityRepository.query(
            `SELECT * FROM sys_module`,
        );
        throw new HttpException(module, HttpStatus.OK);
    }
}
