import { IsString, Length, IsInt, IsArray, Min, Max, IsMongoId, ArrayNotEmpty, IsOptional, IsNumber, IsPositive, IsCurrency } from 'class-validator';
import { EntityDto } from './entity.dto';

export class TrainingDto extends EntityDto {
    @IsString({ message: 'Denumirea este obligatorie' })
    @Length(10, 150, { message: 'Denumirea trebuie sa aiba intre 10 si 150 de caractere' })
    name: string;

    certified: boolean;

    vatFree: boolean;

    @IsNumber()
    @IsPositive({ message: 'Pretul trebuie sa fie un numar pozitiv' })
    @Max(15000, { message: 'Pretul maxim nu poate depasi 15.000' })
    price: number;

    @IsString({ message: 'Valuta este obligatorie' })
    @Length(3, 3, { message: 'Valuta trebuie sa aiba 3 caractere' })
    priceCurr: string;

    description: string;

    @IsInt({ message: 'Durata cursului trebuie sa fie un numar intre' })
    @Min(1, { message: 'Durata minima a cursului este de o zi' })
    @Max(15, { message: 'Durata maxima a cursului este de 15 zile' })
    duration: number;

    @IsMongoId({ message: 'Selectati o organizatie' })
    // tslint:disable-next-line:variable-name
    org_uuid: string;

    @IsArray()
    tags: string[];

    @ArrayNotEmpty({ message: 'Selectati cel putin un standard' })
    standards: string[];

    @ArrayNotEmpty({ message: 'Selectati cel putin un domeniu' })
    domains: string[];
}
