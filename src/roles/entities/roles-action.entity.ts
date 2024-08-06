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
  name: 'sys_role_action',
})
export class RolesAction {
  @ApiProperty({
    description: 'Id',
    example: '',
  })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ description: 'controllerId', example: '' })
  @Column({nullable: true })
  controller_id: number;

  @ApiProperty({ description: 'name', example: '' })
  @Column({ nullable: true})
  name: string;

  @ApiProperty({ description: 'description', example: '' })
  @Column({ nullable: true})
  description: string;

  @ApiProperty({ description: 'isAdmin', example: '' })
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
