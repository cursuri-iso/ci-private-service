import { IsString, Length } from 'class-validator';

import { EntityDto } from './entity.dto';

export class LocationDto extends EntityDto {
    @IsString()
    @Length(5, 100)
    name: string;

    latitude: number;

    longitude: number;
}
