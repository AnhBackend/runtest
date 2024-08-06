import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'sys_role_controller',
})
export class RolesControllers {
  @ApiProperty({
    description: 'ID',
    example: '',
  })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ description: 'moduleId', example: '' })
  @Column({nullable: true })
  module_id: number;

  @ApiProperty({ description: 'parentId', example: '' })
  @Column({ default: 0})
  parent_id: number;

  @ApiProperty({ description: 'name', example: '' })
  @Column({ nullable: true})
  name: string;

  @ApiProperty({ description: 'description', example: '' })
  @Column({ nullable: true})
  description: string;

  @ApiProperty({ description: 'isAdmin', example: 'admin = 1 != 0' })
  @Column({ default: 0 })
  is_admin: number;

  @ApiProperty({ description: 'isUser', example: '' })
  @Column({ default: 0 })
  is_user: number;


  @ApiProperty({ description: 'active user', example: 'default true' })
  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @ApiProperty({ description: 'Created date of user' })
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

}
