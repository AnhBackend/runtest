import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn, ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Roles } from '../../roles/entities/roles.entity';

@Entity({
  name: 'sys_users',
})
export class User {
  @ApiProperty({
    description: 'ID',
    example: '',
  })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ description: 'name of user', example: 'tran xuan phi' })
  @Column({nullable: true })
  full_name: string;

  @ApiProperty({ description: 'Email of user', example: 'atest@email.com' })
  @Column({ nullable: true,unique: true })
  email: string;


  @ApiProperty({ description: 'name of user', example: '0968947194' })
  @Column({ nullable: true })
  mobile: string;

  @ApiProperty({ description: 'admin of user', example: 'admin = 1 != 0' })
  @Column({ default: 0 })
  is_admin: number;

  @ApiProperty({ description: 'roleId of user', example: '' })
  @Column({ nullable: true })
  role_id: number;

  @ApiProperty({ description: 'code caddie of user', example: '12353' })
  @Column({ nullable: true,unique:true })
  code_caddie: string;

  @ApiProperty({ description: 'userName', example: 'tranphi9669' })
  @Column({ nullable: true,unique: true })
  user_name: string;

  @ApiHideProperty()
  @Column({ nullable: true})
  @Exclude({ toPlainOnly: true })
  password: string;

  @ApiProperty({ description: 'active user', example: 'default true' })
  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  birthday: Date;

  @Column({ nullable: true })
  workingday: Date;

  @ApiProperty({ description: 'Created date of user' })
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @ApiProperty({ description: 'Updated date of user' })
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @ManyToOne(() => Roles, roles => roles.user)
  @JoinColumn({
    name: 'role_id'
  })
    role : Roles
  }
