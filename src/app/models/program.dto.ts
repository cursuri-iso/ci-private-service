import { IsString, Length, IsInt, IsArray, Min, Max, IsMongoId, ArrayNotEmpty, IsOptional, IsNumber, IsPositive, IsCurrency, IsDate, IsIn, IsBoolean } from 'class-validator';
import { EntityDto } from './entity.dto';

export class ProgramDto extends EntityDto {
    @IsMongoId()
    // tslint:disable-next-line:variable-name
    training_id: string;

    @IsMongoId()
    // tslint:disable-next-line:variable-name
    org_id: string;

    @ArrayNotEmpty()
    programs: ScheduleDto[];
}

// tslint:disable-next-line:max-classes-per-file
export class ScheduleDto {
    @IsMongoId()
    // tslint:disable-next-line:variable-name
    location_id: string;

    @IsDate()
    startDate: Date;

    @IsInt()
    @Min(1)
    @Max(15)
    duration: number;

    @IsBoolean()
    certified: boolean;

    @IsBoolean()
    vatFree: boolean;

    @IsNumber()
    @IsPositive()
    @Max(15000)
    price: number;

    @IsString()
    @Length(3, 3)
    priceCurr: string;

    @IsString()
    @Length(0, 1000)
    remark: string;
}
