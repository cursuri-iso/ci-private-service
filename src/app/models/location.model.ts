import { Entity, Column } from 'typeorm';

import { EntityModel } from './entity.model';
import { IsString, Length } from 'class-validator';

@Entity('locations')
export class LocationModel extends EntityModel {
    @Column({ nullable: false })
    @IsString()
    @Length(5, 150)
    name: string;

    @Column({ nullable: true })
    location: Geolocation;
}
