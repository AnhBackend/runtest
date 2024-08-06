import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity({
  name: 'sys_role',
})
export class Roles {
  @ApiProperty({
    description: 'ID',
    example: '',
  })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ description: 'code', example: 'SUPAD' })
  @Column({nullable: true,unique:true })
  code: string;

  @ApiProperty({ description: 'name', example: 'supadmin' })
  @Column({ nullable: true})
  name: string;

  @ApiProperty({ description: 'isAdmin', example: 'admin = 1 != 0' })
  @Column({ default: 0 })
  is_admin: number;

  @ApiProperty({ description: 'active user', example: 'default true' })
  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @ApiProperty({ description: 'Created date of user' })
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

@OneToMany(() => User, user => user.role)
  user : User[]
}
