import { ObjectId } from 'mongodb';
import { ObjectIdColumn, Column } from 'typeorm';
import { IsDate, IsBoolean } from 'class-validator';

export class EntityModel {
    @ObjectIdColumn()
    // tslint:disable-next-line:variable-name
    _id?: ObjectId;

    @Column()
    @IsDate()
    createdAt?: Date;

    @Column()
    @IsDate()
    modifiedAt?: Date;

    @Column()
    @IsDate()
    deletedAt?: Date;

    @Column()
    @IsBoolean()
    deleted?: boolean;
}
