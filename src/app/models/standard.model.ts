import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { EntityModel } from './entity.model';
import { ObjectId } from 'mongodb';

@Entity('standards')
export class StandardModel implements EntityModel {
    @ObjectIdColumn()
    // tslint:disable-next-line:variable-name
    _id?: ObjectId;

    @Column({ nullable: false })
    name: string;
}
