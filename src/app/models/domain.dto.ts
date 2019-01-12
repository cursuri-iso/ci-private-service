import { IsString, Length } from 'class-validator';

import { EntityDto } from './entity.dto';

export class DomainDto extends EntityDto {
    @IsString()
    @Length(5, 150)
    name: string;
}
