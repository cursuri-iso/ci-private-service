import { Entity, Column } from 'typeorm';

import { EntityModel } from './entity.model';
import { IsString, Length } from 'class-validator';

@Entity('domains')
export class DomainModel extends EntityModel {
    @Column({ nullable: false })
    @IsString()
    @Length(5, 150)
    name: string;
}
