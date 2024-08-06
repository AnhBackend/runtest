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
  name: 'sys_branch',
})
export class Branch {
  @ApiProperty({
    description: 'ID of user',
    example: '',
  })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ description: 'city', example: 123 })
  @Column({nullable: true })
  city_id: number;

  @ApiProperty({ description: 'code', example: 'HCM' })
  @Column({ unique: true })
  code: string;


  @ApiProperty({ description: 'name branch', example: 'Sân golf hải phòng' })
  @Column({ nullable: true })
  name: string;

  @ApiProperty({ description: 'description', example: 'Sân golf hải phòng...' })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ description: 'address', example: 'Đảo Vũ Yên, Nguyễn Bỉnh Khiêm, Đông Hải 2, Hải An, Hải Phòng ' })
  @Column({ nullable: true })
  address: string;

  @ApiProperty({ description: 'active user', example: 'default true' })
  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @ApiProperty({ description: 'date of branch' })
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @ApiProperty({ description: 'date of branch' })
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

}
