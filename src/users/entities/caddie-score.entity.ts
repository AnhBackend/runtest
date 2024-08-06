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
    name: 'sys_caddie_score',
})
export class CaddieScore {
    @ApiProperty({
        description: 'ID',
        example: '',
    })
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({ description: 'string', example: '' })
    @Column({ nullable: false })
    user_id: number;

    @ApiProperty({ description: 'code caddie of user', example: '12353' })
    @Column({ nullable: true })
    code_caddie: string;

    @ApiProperty({ description: 'Review description', example: '' })
    @Column({ nullable: true })
    note: string;

    @ApiProperty({ description: 'LTO code Evaluate', example: '' })
    @Column({ nullable: true })
    lto: string;

    @ApiProperty({ description: 'number booking', example: '12353' })
    @Column({ default:0 })
    score: number;

    @ApiProperty({ description: 'Created date of user' })
    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

}
