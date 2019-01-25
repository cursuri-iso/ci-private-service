import { Entity, Column } from 'typeorm';
import { EntityModel } from './entity.model';
import { IsString, Length, IsBoolean, IsNumber, IsInt, IsArray, Min, Max, IsMongoId, ArrayNotEmpty, IsPositive } from 'class-validator';

@Entity('trainings')
export class TrainingModel extends EntityModel {
    @Column({ nullable: false })
    @IsString()
    @Length(10, 150)
    name: string;

    @Column()
    @IsBoolean()
    certified: boolean;

    @Column()
    @IsBoolean()
    vatFree: boolean;

    @Column({ nullable: false })
    @IsNumber()
    @IsPositive()
    @Max(15000)
    price: number;

    @Column({ nullable: false })
    @IsString()
    @Length(3, 3)
    priceCurr: string;

    @Column()
    @IsString()
    @Length(0, 1000)
    description: string;

    @Column({ nullable: false })
    @IsInt()
    @Min(1)
    @Max(15)
    duration: number;

    @Column({ nullable: false })
    @IsMongoId()
    // tslint:disable-next-line:variable-name
    org_id: string;

    @Column()
    @IsArray()
    tags?: string[];

    @Column()
    @ArrayNotEmpty()
    standards: string[];

    @Column()
    @ArrayNotEmpty()
    domains: string[];
}
