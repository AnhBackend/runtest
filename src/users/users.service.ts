import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import moment from 'moment';
import {  Between,FindOptionsWhere,Repository,createQueryBuilder } from 'typeorm';

import { User } from './entities/user.entity';
import { CaddieScore } from './entities/caddie-score.entity';
import { CaddieBooking } from './entities/caddie-booking.entity';
import { SignUpCaddieDto } from '../users/dto/create-caddie.dto';
import { CreateCaddieScoreDto } from '../users/dto/create-caddie-score.dto';
import { CreateCaddieBookingDto } from '../users/dto/create-caddie-booking.dto';
import { MysqlErrorCode } from '../common/enums/error-codes.enum';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { actionBranchDto } from '../branch/dto/action-branch.dto';
import { Branch } from '../branch/entities/branch.entity';
import any = jasmine.any;
export interface user {
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
}
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(CaddieScore)
        private readonly caddieScoreRepository: Repository<CaddieScore>,
        @InjectRepository(CaddieBooking)
        private readonly caddieBookingRepository: Repository<CaddieBooking>,
    ) {
    }

    async getMe(userId: number): Promise<{}> {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        });
        if (!user) {
            throw new HttpException(`User not found`, HttpStatus.BAD_REQUEST);
        }
        const resultObject = {
            statusCode: 200,
            data: {},
        };

        resultObject.data = user;
        throw new HttpException(resultObject, HttpStatus.OK);
    }

    async getCaddieByCode(code: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: {
                code_caddie: code,
            },
        });
        if (!user) {
            throw new HttpException(`User not found`, HttpStatus.BAD_REQUEST);
        }

        return user;
    }
    getCaddieBookingByDate = async (code:string) => {
        const caddie = await this.caddieBookingRepository.findOne({
            where: {
                code_caddie: code,
                created_at: Between(
                    new Date(moment().add(7, 'h').startOf('date').format('YYYY-MM-DD HH:mm')),
                    new Date(moment().add(7, 'h').endOf('date').format('YYYY-MM-DD HH:mm')),
                ),
            },
        });
        if (!caddie) {
            return false;
        }

        return caddie;
    }

    async createCaddieBooking(CreateCaddieBookingDto: CreateCaddieBookingDto){
         const {userId,codeCaddie} = CreateCaddieBookingDto;
         const isCaddieBooking = await this.getCaddieBookingByDate(codeCaddie);

         const caddieBooking = new CaddieBooking();
         const user = await this.userRepository.findOne({
            where: {
                code_caddie: codeCaddie,
            },
         });
         if (!user){
             throw new HttpException(`User not found`, HttpStatus.BAD_REQUEST);
         }
         try {
             if (isCaddieBooking == false){
                caddieBooking.userId = user.id;
                caddieBooking.code_caddie = codeCaddie;
                caddieBooking.total_booking = 1;
                await this.caddieBookingRepository.save(caddieBooking)
             }else{
                 caddieBooking.userId = user.id;
                 caddieBooking.code_caddie = codeCaddie;
                 caddieBooking.total_booking = isCaddieBooking.total_booking + 1;
                 await this.caddieBookingRepository.update(isCaddieBooking.id,caddieBooking);
             }
             throw new HttpException(`Thành Công`, HttpStatus.OK);

         } catch (error) {

             throw error;
         }
    }

    async createScoreCaddie(body:CreateCaddieScoreDto){
        const {userId,codeCaddie,note,score,lto} = body;
        const user = await this.userRepository.findOne({
            where: {
                code_caddie: codeCaddie,
            },
        });
        if (!user){
            throw new BadRequestException('User not found');
        }
        try {
            const caddieScoreDb = new CaddieScore();
            caddieScoreDb.user_id= user.id;
            caddieScoreDb.code_caddie = codeCaddie;
            caddieScoreDb.lto = lto;
            caddieScoreDb.note = note;
            caddieScoreDb.score = score;
            await this.caddieScoreRepository.save(caddieScoreDb);
        } catch (error){
            throw error;
        }
    }

    async getScoreByCaddieCode(code:string): Promise<{data:any,status:number}>{

        const data = await this.caddieScoreRepository.find({
            where: {
                code_caddie: code,
            },
        });
        if (!data){
            throw new HttpException(`Data not found`, HttpStatus.BAD_REQUEST);
        }
        const resultObject = {
            status: 200,
            data: [],
            score: 0
        };
        let totalScore = 0 ;
        data.forEach((item, index) => {
            resultObject.data.push({
                'lto':item.lto,
                'note':item.note,
                'score':item.score,
                'created':item.created_at
            })
            totalScore += item.score;
        });
        resultObject.score = Math.round(totalScore/data.length);
        throw new HttpException(resultObject, HttpStatus.OK);
    }

    async getCaddieOrderByBooking(): Promise<User> {
        const user =  await this.userRepository.query(
            `SELECT * FROM sys_users`,
        );
        return user;

    }

    async signUpCaddie(SignUpCaddieDto: SignUpCaddieDto): Promise<void> {
        const { email, codeCaddie, fullName, mobile,gender,birthday,workingday } = SignUpCaddieDto;
        try {
            const user = new User();
            user.email = email;
            user.code_caddie = codeCaddie;
            user.full_name = fullName;
            user.mobile = mobile;
            user.gender = gender;
            user.birthday = birthday;
            user.workingday = workingday;
            user.type = 'caddie';
            await this.userRepository.save(user);
        } catch (error) {
            throw new HttpException(error.detail?error.detail:'Dữ liệu không hợp lệ!', HttpStatus.BAD_REQUEST);
        }
    }

    async editUser(id:number,body:user) {
        const { fullName,roleId,email,codeCaddie,isAdmin,password,isActive,mobile,gender,workingday,birthday } = body;
        try {
            const param = new User();
            param.full_name     = fullName;
            param.role_id       = roleId;
            param.email         = email;
            param.code_caddie   = codeCaddie;
            param.is_admin      = isAdmin;
            param.mobile        = mobile;
            param.gender        = gender;
            param.workingday    = workingday;
            param.birthday      = birthday;
            param.is_active     = isActive;
            await this.userRepository.update(id, param);
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
    async getAllUser(options: IPaginationOptions, findOption:  FindOptionsWhere<User>) {
        const queryBuilder = this.userRepository.createQueryBuilder('user')
            .leftJoin("user.role", "role").orderBy("user.created_at", "DESC");
        if(findOption.role_id) queryBuilder.andWhere("role.id = :role_id", {role_id: findOption.role_id})
        if(findOption.type) queryBuilder.andWhere("user.type = :type", {type: findOption.type})
        if(findOption.id) queryBuilder.andWhere("user.id = :id", {id: findOption.id})

        const data = await paginate<User>(queryBuilder, options);
        return data;

    }
    async getAllCaddie(): Promise<User> {
        const user =  await this.userRepository.query(
            `SELECT * FROM sys_users where type = 'caddie'`,
        );
        return user;

    }
}
