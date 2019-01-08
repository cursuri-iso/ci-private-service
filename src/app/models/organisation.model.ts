import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';
import { IsString, MinLength, IsUUID, IsUrl, IsArray, IsEmail, ValidateIf, IsNotEmpty } from 'class-validator';

@Entity('organisations')
export class OrganisationModel {
    @ObjectIdColumn()
    // tslint:disable-next-line:variable-name
    _id?: ObjectId;

    @Column({ nullable: false })
    name: string;
}
