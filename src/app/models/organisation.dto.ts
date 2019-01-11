import { IsUrl, IsString, Length } from 'class-validator';

import { EntityDto } from './entity.dto';

export class OrganisationDto implements EntityDto {
    @IsString()
    @Length(5, 75)
    name: string;

    @IsUrl()
    logoUrl: string;

    @IsUrl({ require_protocol: true })
    scheduleUrl: string;

    @IsUrl({ require_protocol: true })
    registrationUrl: string;
}
