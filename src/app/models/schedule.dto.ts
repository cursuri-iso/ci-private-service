import { IsMongoId, IsDate, IsInt, Min, Max, IsBoolean, IsNumber, IsPositive, IsString, Length, IsOptional } from 'class-validator';

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
    @IsOptional()
    @Length(0, 1000)
    remark: string;
}
