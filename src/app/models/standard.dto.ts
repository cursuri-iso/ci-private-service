import { IsString, Length } from 'class-validator';

import { EntityDto } from './entity.dto';

export class StandardDto extends EntityDto {
    @IsString()
    @Length(5, 75)
    name: string;
}
