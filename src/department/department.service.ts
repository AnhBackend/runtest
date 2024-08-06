import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Department } from './entities/department.entity';
import {actionDepartmentDto} from './dto/action-department.dto';
import { MysqlErrorCode } from '../common/enums/error-codes.enum';

@Injectable()
export class DepartmentService {
    constructor(
        @InjectRepository(Department)
        private readonly departmentRepository: Repository<Department>,
    ) {
    }

    async getById(brachId: number): Promise<Department> {
        const branch = await this.departmentRepository.findOne({
            where: {
                id: brachId,
            },
        });
        if (!branch) {
            throw new HttpException(`branch not found`, HttpStatus.BAD_REQUEST);
        }
        return branch;
    }
    async create(actionBranchDto:actionDepartmentDto){
        const {code,name,description,} = actionBranchDto;
        try {
            const body = new Department();
            body.code = code;
            body.name = name;
            body.description = description;
            await this.departmentRepository.save(body);
            throw new HttpException(``, HttpStatus.OK);
        } catch (error) {

            if (error.code == MysqlErrorCode.UniqueViolationPg) {
                throw new HttpException(`branch code ${code} already exist`, HttpStatus.BAD_REQUEST);
            }
            throw error;
        }
    }

    async update(id:number,body:actionDepartmentDto){
        const {code,name,description,} = body;
        try {
            const body = new Department();
            body.code = code;
            body.name = name;
            body.description = description;
            await this.departmentRepository.update(id,body);
            throw new HttpException(`Thành công`, HttpStatus.OK);
        } catch (error) {
            if (error.code == MysqlErrorCode.UniqueViolationPg) {
                throw new HttpException(`department code ${code} already exist`, HttpStatus.BAD_REQUEST);
            }
            throw error;
        }
    }


}
