import { Entity, Column } from 'typeorm';

import { EntityModel } from './entity.model';
import { IsString, Length } from 'class-validator';

@Entity('standards')
export class StandardModel extends EntityModel {
    @Column({ nullable: false })
    @IsString()
    @Length(5, 75)
    name: string;
}
