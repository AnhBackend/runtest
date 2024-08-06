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
  name: 'sys_role_relationship',
})
export class RolesRelationship {
  @ApiProperty({
    description: 'Id',
    example: '',
  })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ description: 'isAdmin', example: '' })
  @Column({ default: 0 })
  user_id: number;

  @ApiProperty({ description: 'isAdmin', example: '' })
  @Column({ default: 0 })
  role_id: number;

  @ApiProperty({ description: 'controllerId', example: '' })
  @Column({nullable: true })
  controller_id: number;

  @ApiProperty({ description: 'actionId', example: '' })
  @Column({nullable: true })
  action_id: number;

  @ApiProperty({ description: 'active user', example: 'default true' })
  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @ApiProperty({ description: 'Created date of user' })
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}
