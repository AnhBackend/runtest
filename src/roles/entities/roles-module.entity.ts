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
  name: 'sys_role_module',
})
export class RolesModule {
  @ApiProperty({
    description: 'ID of user',
    example: '',
  })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ description: 'code', example: 'SUPAD' })
  @Column({nullable: true,unique:true })
  code: string;

  @ApiProperty({ description: 'name', example: '' })
  @Column({ nullable: true})
  name: string;

}
