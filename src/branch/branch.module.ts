import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Branch } from './entities/branch.entity';
import { User } from '../users/entities/user.entity';
import { BranchManager } from './entities/branch-manager.entity';
import { BranchController } from './branch.controller';
import { BranchService } from './branch.service';
import { ServiceValidation } from '../common/validation/service.validation';
import { Group } from '../group/entities/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Branch,BranchManager,User,Group])],
  controllers: [BranchController],
  providers: [BranchService,ServiceValidation],
})
export class BranchModule {}
