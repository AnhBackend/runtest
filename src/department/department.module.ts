import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Department } from './entities/department.entity';
import { DepartmentManager } from './entities/department-manager.entity';
import { BranchDepartment } from './entities/branch-department';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';

@Module({
  imports: [TypeOrmModule.forFeature([Department,BranchDepartment,DepartmentManager])],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule {}
