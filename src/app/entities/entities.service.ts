import { Injectable } from '@nestjs/common';
import { ObjectType } from 'typeorm';

import { DatabaseService } from '../../shared/database/database.service';
import { EntityDto } from '../models/entity.dto';
import { EntityModel } from '../models/entity.model';
import { RabbitMessageQueue } from '../../shared/mq/rabbit.mq.component';
import { PaginationModel } from '../models/pagination.model';
import { PagedList } from '../models/pagedList.model';

@Injectable()
export class EntitiesService {
    constructor(private databaseService: DatabaseService, private mqService: RabbitMessageQueue) {}

    async getEntities(model: ObjectType<EntityModel>, dto: ObjectType<EntityDto>, pagination: PaginationModel): Promise<PagedList<EntityDto>> {
        const result =  await this.databaseService.find(model, {}, { name: 'ASC' }, pagination);
        const mapped = automapper.map(model.name, dto.name, result[0]);

        return PagedList.create<EntityDto>(mapped, result[1], pagination.pageNumber, pagination.pageSize);
    }

    async createEntity(model: ObjectType<EntityModel>, entity: EntityDto): Promise<any> {
        await this.databaseService.add(model, entity);
    }
}
