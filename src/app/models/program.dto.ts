import { IsMongoId, ValidateNested, ArrayNotEmpty, IsArray } from 'class-validator';
import { EntityDto } from './entity.dto';
import { ScheduleDto } from './schedule.dto';

export class ProgramDto extends EntityDto {
    @IsMongoId()
    // tslint:disable-next-line:variable-name
    training_id: string;

    @IsMongoId()
    // tslint:disable-next-line:variable-name
    org_id: string;

    @IsArray()
    @ValidateNested({ each: true })
    schedules: ScheduleDto[];
}
