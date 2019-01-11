import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { EntityModel } from './entity.model';
import { ObjectId } from 'mongodb';
import { IsUrl, IsString, Length } from 'class-validator';

@Entity('organisations')
export class OrganisationModel implements EntityModel {
    @ObjectIdColumn()
    // tslint:disable-next-line:variable-name
    _id?: ObjectId;

    @Column({ nullable: false })
    @IsString()
    @Length(5, 70)
    name: string;

    @Column()
    @IsUrl({ require_protocol: true })
    // tslint:disable-next-line:variable-name
    logo_url: string;

    @Column()
    @IsUrl({ require_protocol: true })
    // tslint:disable-next-line:variable-name
    schedule_url: string;

    @Column()
    @IsUrl({ require_protocol: true })
    // tslint:disable-next-line:variable-name
    registration_url: string;
}
