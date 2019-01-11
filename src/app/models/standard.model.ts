import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';

import { EntityModel } from './entity.model';
import { IsString, Length } from 'class-validator';

@Entity('standards')
export class StandardModel implements EntityModel {
    @ObjectIdColumn()
    // tslint:disable-next-line:variable-name
    _id?: ObjectId;

    @Column({ nullable: false })
    @IsString()
    @Length(5, 75)
    name: string;
}