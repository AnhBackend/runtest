import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Roles } from './entities/roles.entity';
import { RolesRelationship } from './entities/role-relationship.entity';
import { RolesAction } from './entities/roles-action.entity';
import { RolesControllers } from './entities/roles-controller.entity';
import { RolesModule } from './entities/roles-module.entity';

import { RolesController } from './roles.controller';
import { RolesService} from './roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Roles,RolesRelationship,RolesAction,RolesControllers,RolesModule])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModules {}
