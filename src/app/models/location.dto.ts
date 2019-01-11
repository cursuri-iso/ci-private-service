import { IsString, Length } from 'class-validator';

import { EntityDto } from './entity.dto';

export class LocationDto implements EntityDto {
    @IsString()
    @Length(5, 100)
    name: string;

    location: Geolocation;
}
