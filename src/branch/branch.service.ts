import { BadRequestException, ConflictException, Injectable,HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Branch } from './entities/branch.entity';
import { BranchManager } from './entities/branch-manager.entity';
import {actionBranchDto} from './dto/action-branch.dto';
import { actionBranchManagerDto } from './dto/action-branch-manager.dto';
import { MysqlErrorCode } from '../common/enums/error-codes.enum';
import { ServiceValidation } from '../common/validation/service.validation';

@Injectable()
export class BranchService {
    constructor(
        @InjectRepository(Branch)
        private readonly branchRepository: Repository<Branch>,
        @InjectRepository(BranchManager)
        private readonly branchManagerRepository: Repository<BranchManager>,
        private readonly serviceValidation: ServiceValidation,
    ) {
    }

    async getBranchById(brachId: number): Promise<Branch> {
        const branch = await this.branchRepository.findOne({
            where: {
                id: brachId,
            },
        });
        if (!branch) {
            throw new HttpException('branch not found', HttpStatus.BAD_REQUEST);
        }
        return branch;
    }
    async create(actionBranchDto:actionBranchDto){
        const {code,cityId,address,name,description,} = actionBranchDto;
        try {
            const branch = new Branch();
            branch.city_id = cityId;
            branch.code = code;
            branch.address = address;
            branch.name = name;
            branch.description = description;
            await this.branchRepository.save(branch);
            throw new HttpException(`Thành Công`, HttpStatus.OK);
        } catch (error) {

            if (error.code == MysqlErrorCode.UniqueViolationPg) {
                throw new HttpException(`branch code ${code} already exist`, HttpStatus.BAD_REQUEST);
            }
            throw error;
        }
    }

    async update(id:number,body:actionBranchDto){
        const {code,cityId,address,name,description,} = body;
        try {
            const branch = new Branch();
            branch.city_id = cityId;
            branch.code = code;
            branch.address = address;
            branch.name = name;
            branch.description = description;
            await this.branchRepository.update(id,branch);
            throw new HttpException(`Thành Công`, HttpStatus.OK);
        } catch (error) {
            if (error.code == MysqlErrorCode.UniqueViolationPg) {
                throw new HttpException(`branch code ${code} already exist`, HttpStatus.BAD_REQUEST);
            }
            throw error;
        }
    }

    async addManager(body:actionBranchManagerDto){
        const {branchId,userId} = body;
        const isUser = await this.serviceValidation.isUser(body.userId);
        const isBranch = await this.serviceValidation.isBranch(body.branchId);

        if (!isUser){
            throw new HttpException(`users does not exist`, HttpStatus.BAD_REQUEST);
        }
        if (!isBranch){
            throw new HttpException(`branch does not exist`, HttpStatus.BAD_REQUEST);
        }

        const isCheck = await this.branchManagerRepository.findOne({
            where: {
                branch_id: body.branchId,
                user_id: body.userId
            },
        });
        if (isCheck) {
            throw new HttpException(`${body.userId} already exist`, HttpStatus.BAD_REQUEST);
        }
        try {
            const data = new BranchManager();
            data.branch_id = branchId;
            data.user_id = userId;
            await this.branchManagerRepository.save(data);
            throw new HttpException(`Thành Công`, HttpStatus.OK);
        } catch (error){
            throw error;
        }
    }
}
