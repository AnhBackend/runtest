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
    name: 'sys_branch_manager',
})
export class BranchManager {
    @ApiProperty({
        description: 'ID of user',
        example: '',
    })
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({ description: 'string', example: '' })
    @Column({ nullable: false })
    branch_id: number;

    @ApiProperty({ description: 'string', example: '' })
    @Column({ nullable: false })
    user_id: number;

    @ApiProperty({ description: 'active user', example: 'default true' })
    @Column({ type: 'boolean', default: true })
    is_active: boolean;

}
