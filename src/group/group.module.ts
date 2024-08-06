import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Group } from './entities/group.entity';
import { GroupUser } from './entities/group-user.entity';
import { GroupManager } from './entities/group-manager.entity';
import { DepartmentGroup } from './entities/department-group.entity';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { ServiceValidation } from '../common/validation/service.validation';
import { Branch } from '../branch/entities/branch.entity';
import { User } from '../users/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([
        Group,
        GroupUser,
        GroupManager,
        DepartmentGroup,
        Branch,
        User,
    ])],
    controllers: [GroupController],
    providers: [GroupService,ServiceValidation],
})
export class GroupModule {
}
