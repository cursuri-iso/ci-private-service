import { Injectable } from '@nestjs/common';
import { ObjectType } from 'typeorm';

import { DatabaseService } from '../../shared/database/database.service';
import { EntityDto } from '../models/entity.dto';
import { EntityModel } from '../models/entity.model';
import { RabbitMessageQueue } from '../../shared/mq/rabbit.mq.component';

@Injectable()
export class EntitiesService {
    constructor(private databaseService: DatabaseService, private mqService: RabbitMessageQueue) {}

    async createEntity(model: ObjectType<EntityModel>, entity: EntityDto): Promise<any> {
        await this.databaseService.add(model, entity);
    }
}
