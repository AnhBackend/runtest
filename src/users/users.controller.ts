import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query, ParseIntPipe, DefaultValuePipe, Put } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiQuery,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ActiveUser } from '../common/decorators/active-user.decorator';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { SignUpCaddieDto } from '../users/dto/create-caddie.dto';
import { CreateCaddieScoreDto } from '../users/dto/create-caddie-score.dto';
import { CreateCaddieBookingDto } from '../users/dto/create-caddie-booking.dto';
import moment from 'moment/moment';
import { Public } from '../common/decorators/public.decorator';
import { SignUpDto } from '../auth/dto/sign-up.dto';

@ApiTags('users')
@Controller('api/users')
export class UsersController{
  constructor(private readonly usersService: UsersService) {}

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOkResponse({ description: "Get logged in user's details", type: User })
  @ApiBearerAuth()
  @Get('me')
  async getMe(@ActiveUser('id') userId: number): Promise<{}> {
    return this.usersService.getMe(userId);
  }

  @ApiConflictResponse({
    description: 'Caddie already exists',
  })
  @ApiBadRequestResponse({
    description: 'Return errors for invalid sign up fields',
  })
  @ApiCreatedResponse({
    description: 'caddie has been successfully signed up',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @Post('caddie/sign-up')
  signUpCaddie(@Body() SignUpCaddieDto: SignUpCaddieDto): Promise<void> {
    return this.usersService.signUpCaddie(SignUpCaddieDto);
  }
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @Post('caddie/score/create')
  createScoreCaddie(@Body() createCaddieScoreDto:CreateCaddieScoreDto): Promise<void> {
    return this.usersService.createScoreCaddie(createCaddieScoreDto);
  }
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @Post('caddie/booking/create')
  createBookingCaddie(@Body() CreateCaddieBookingDto: CreateCaddieBookingDto): Promise<void> {
    return this.usersService.createCaddieBooking(CreateCaddieBookingDto);
  }
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @Get('caddie/score/get/:code')
  getScoreByCaddieCode( @Param('code') code:string): Promise<{data:any,status:number}> {
    return this.usersService.getScoreByCaddieCode(code);
  }
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @Get('caddie/sort-booking/get')
  getCaddieOrderByBooking(): Promise<User> {
    return this.usersService.getCaddieOrderByBooking();
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @Get('caddie/booking')
  getCaddieBooking() {
    return this.usersService.getCaddieOrderByBooking();
    const date = moment().add(7, 'h').startOf('month').format('YYYY-MM-DD HH:mm');
    const dateend = new Date(moment().add(7, 'h').endOf('month').format('YYYY-MM-DD HH:mm'));

  }
  @ApiBearerAuth()
  @ApiQuery({ name: 'page', description: 'Số trang', type: 'number', example: 1, required: false })
  @ApiQuery({ name: 'limit', description: 'Số row dữ liệu lấy về 1 trang', type: 'number', example: 10, required: false })
  @ApiQuery({ name: 'role_id', description: 'role_id', type: 'number', example: '1', required: false })
  @ApiQuery({ name: 'type', description: 'type', type: 'string', example: 'caddie', required: false })
  @ApiQuery({ name: 'id', description: 'id', type: 'number', example: '1', required: false })
  @Get('list')
  getAllUser(
      @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
      @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
      @Query('role_id') role_id: number,
      @Query('type') type: string,
      @Query('id') id: number,
  ) {
    return this.usersService.getAllUser({ page, limit }, { role_id, id,type });
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @Put('/edit/:id')
  editUser( @Param('id') id:number, @Body() signUpDto:{
    fullName:string,
    roleId:number,
    email:string,
    codeCaddie:string,
    isAdmin:number,
    password:string,
    isActive:boolean,
    gender:string,
    mobile:string,
    birthday:Date,
    workingday:Date,
  }): Promise<void> {
    return this.usersService.editUser(id, signUpDto);
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @Get('get/all-caddie')
  getAllCaddie() {
    return this.usersService.getAllCaddie();
  }
}
