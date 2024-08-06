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
  name: 'sys_group',
})
export class Group {
  @ApiProperty({
    description: 'ID of group',
    example: '',
  })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ description: 'code', example: 'GR001' })
  @Column({ unique: true })
  code: string;


  @ApiProperty({ description: 'name group', example: 'nhóm caddie 01' })
  @Column({ nullable: true })
  name: string;

  @ApiProperty({ description: 'description', example: 'nhóm caddie 01' })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ description: 'active', example: 'default true' })
  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @ApiProperty({ description: 'date of department' })
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @ApiProperty({ description: 'date of department' })
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

}
