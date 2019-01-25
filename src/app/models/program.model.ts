import { Entity, Column } from 'typeorm';

import { EntityModel } from './entity.model';
import { IsString, Length, IsDate, IsInt, IsBoolean, IsNumber, IsPositive, Max, Min, IsMongoId } from 'class-validator';

@Entity('programs')
export class ProgramModel extends EntityModel {
    @Column()
    @IsDate()
    startDate: Date;

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
    remark: string;

    @Column({ nullable: false })
    @IsInt()
    @Min(1)
    @Max(15)
    duration: number;

    @Column()
    @IsMongoId()
    // tslint:disable-next-line:variable-name
    training_id: string;

    @Column()
    @IsMongoId()
    // tslint:disable-next-line:variable-name
    org_id: string;

    @Column()
    @IsMongoId()
    // tslint:disable-next-line:variable-name
    location_id: string;
}
