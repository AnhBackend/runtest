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
    name: 'sys_caddie_booking',
})
export class CaddieBooking {
    @ApiProperty({
        description: 'ID',
        example: '',
    })
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({ description: 'string', example: '' })
    @Column({ nullable: false })
    userId: number;

    @ApiProperty({ description: 'code caddie of user', example: '12353' })
    @Column({ nullable: true })
    code_caddie: string;

    @ApiProperty({ description: 'number booking', example: '12353' })
    @Column({default:0 })
    total_booking: number;

    @ApiProperty({ description: 'Created date of user' })
    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;


}
