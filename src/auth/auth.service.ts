import {
    BadRequestException,
    ConflictException, HttpException, HttpStatus,
    Inject,
    Injectable,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';

import jwtConfig from '../common/config/jwt.config';
import { MysqlErrorCode } from '../common/enums/error-codes.enum';
import { ActiveUserData } from '../common/interfaces/active-user-data.interface';
import { RedisService } from '../redis/redis.service';
import { User } from '../users/entities/user.entity';
import { BcryptService } from './bcrypt.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { userHelper } from '../common/helper/user-helper.service'

@Injectable()
export class AuthService {
    constructor(
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
        private readonly bcryptService: BcryptService,
        private readonly jwtService: JwtService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly redisService: RedisService,
        private readonly userHelper: userHelper,
    ) {}

    async signUp(signUpDto: SignUpDto): Promise<void> {
        const { userName, password,fullName,type,email,roleId,mobile } = signUpDto;

        try {
            const user = new User();
            user.user_name = userName;
            user.full_name = fullName;
            user.role_id = roleId;
            user.email = email;
            user.type = type;
            user.mobile = mobile;
            user.password = await this.bcryptService.hash(password);
            await this.userRepository.save(user);
        } catch (error) {

            if (error.code == MysqlErrorCode.UniqueViolationPg) {
                throw new HttpException(`User [${userName}] already exist`, HttpStatus.BAD_REQUEST);
            }
            throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
        }
        throw new HttpException('', HttpStatus.OK);
    }

    async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
        const { userName, password } = signInDto;

        const user = await this.userRepository.findOne({
            where: {
                user_name:userName,
            },
        });
        if (!user) {
            throw new HttpException(`Invalid userName`, HttpStatus.BAD_REQUEST);
        }

        const isPasswordMatch = await this.bcryptService.compare(
            password,
            user.password,
        );
        if (!isPasswordMatch) {
            throw new HttpException(`Invalid password`, HttpStatus.BAD_REQUEST);
        }

        const isSelectOption = await this.userHelper.isSelectOption(user.id);
        await this.userHelper.getRoleName(user.id);
        if (isSelectOption && user.is_admin > 0 ){

        }
        const tokent = await this.generateAccessToken(user);
        throw new HttpException(tokent, HttpStatus.OK);

    }

    async signOut(userId: string): Promise<void> {
        this.redisService.delete(`user-${userId}`);
    }

    async generateAccessToken(
        user: Partial<User>,
    ): Promise<{ accessToken: string }> {
        const tokenId = randomUUID();
        await this.redisService.insert(`user-${user.id}`, tokenId);
        const role = await this.userHelper.getRoleName(user.id);
        const accessToken = await this.jwtService.signAsync(
            {
                id: user.id,
                email: user.email,
                type: user.type,
                role: role[0] ? role[0].code : '',
                tokenId,
            } as ActiveUserData,
            {
                secret: this.jwtConfiguration.secret,
                expiresIn: this.jwtConfiguration.accessTokenTtl,
            },
        );

        return { accessToken };
    }

}
