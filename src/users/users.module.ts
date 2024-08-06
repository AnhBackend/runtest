import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { CaddieScore } from './entities/caddie-score.entity';
import { CaddieBooking } from './entities/caddie-booking.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User,CaddieScore,CaddieBooking])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
