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
  name: 'sys_department',
})
export class Department {
  @ApiProperty({
    description: 'ID of department',
    example: '',
  })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ description: 'code', example: 'DEP001' })
  @Column({ unique: true })
  code: string;


  @ApiProperty({ description: 'name branch', example: 'phòng vận hành' })
  @Column({ nullable: true })
  name: string;

  @ApiProperty({ description: 'description', example: 'phòng vận hành' })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ description: 'active user', example: 'default true' })
  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @ApiProperty({ description: 'date of department' })
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @ApiProperty({ description: 'date of department' })
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

}
