import { Injectable } from '@nestjs/common';

import { DatabaseService } from '../../shared/database/database.service';
import { EntityDto } from '../models/entity.dto';
import { EntityModel } from '../models/entity.model';
import { ObjectType } from 'typeorm';

@Injectable()
export class EntitiesService {
    constructor(private databaseService: DatabaseService) {}

    async createEntity(model: ObjectType<EntityModel>, entity: EntityDto): Promise<any> {
        this.databaseService.add(model, entity);
    }
}
