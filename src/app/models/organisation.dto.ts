import { IsString, Length } from 'class-validator';

export class OrganisationDto {
    @IsString()
    @Length(5, 100)
    name: string;
}
