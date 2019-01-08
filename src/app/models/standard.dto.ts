import { IsString, Length } from 'class-validator';

import { EntityDto } from './entity.dto';

export class StandardDto implements EntityDto {
    @IsString()
    @Length(5, 75)
    name: string;
}
