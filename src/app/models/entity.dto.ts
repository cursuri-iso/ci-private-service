import { IsDate, IsBoolean, Allow } from 'class-validator';

export class EntityDto {
    createdAt?: Date;

    modifiedAt?: Date;

    deletedAt?: Date;

    deleted?: boolean;
}
