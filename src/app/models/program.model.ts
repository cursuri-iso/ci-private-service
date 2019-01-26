import { Entity, Column } from 'typeorm';

import { EntityModel } from './entity.model';
import { IsString, Length, IsDate, IsInt, IsBoolean, IsNumber, IsPositive, Max, Min, IsMongoId, ArrayNotEmpty, ValidateNested } from 'class-validator';
import { ScheduleDto } from './schedule.dto';

@Entity('programs')
export class ProgramModel extends EntityModel {
    @Column()
    @IsMongoId()
    // tslint:disable-next-line:variable-name
    training_id: string;

    @Column()
    @IsMongoId()
    // tslint:disable-next-line:variable-name
    org_id: string;

    @Column()
    @ValidateNested({ each: true })
    schedules: ScheduleDto[];
}
