import { Injectable } from '@nestjs/common';
import { ObjectType } from 'typeorm';
import { ObjectID } from 'mongodb';

import { DatabaseService } from '../../shared/database/database.service';
import { EntityDto } from '../models/entity.dto';
import { EntityModel } from '../models/entity.model';
import { RabbitMessageQueue } from '../../shared/mq/rabbit.mq.component';
import { PaginationModel } from '../models/pagination.model';
import { PagedList } from '../models/pagedList.model';
import { SortingModel } from '../models/sorting.model';
import { SearchModel } from '../models/search.model';

@Injectable()
export class EntitiesService {
    constructor(private databaseService: DatabaseService, private mqService: RabbitMessageQueue) {}

    async getEntities(model: ObjectType<EntityModel>,
                      dto: ObjectType<EntityDto>,
                      pagination: PaginationModel,
                      sorting?: SortingModel,
                      search?: SearchModel): Promise<PagedList<EntityDto>> {
        const result =  await this.databaseService.find(model, search, sorting, pagination);
        const mapped = automapper.map(model.name, dto.name, result[0]);

        return PagedList.create<EntityDto>(mapped, result[1], pagination.pageNumber, pagination.pageSize);
    }

    async getEntity(model: ObjectType<EntityModel>, dto: ObjectType<EntityDto>, id: string): Promise<EntityDto> {
        if (ObjectID.isValid(id)) {
            const result = await this.databaseService.getOne(model, { _id: new ObjectID(id) });
            const mapped = automapper.map(model.name, dto.name, result);

            return mapped;
        }

        return null;
    }

    async createEntity(model: ObjectType<EntityModel>, dto: ObjectType<EntityDto>, entity: EntityDto): Promise<any> {
        entity.createdAt = new Date();
        const mapped = automapper.map(dto.name, model.name, entity);

        await this.databaseService.add(model, mapped);
    }

    async patchEntity(model: ObjectType<EntityModel>, dto: ObjectType<EntityDto>, entity: EntityDto, id: string): Promise<any> {
        if (ObjectID.isValid(id)) {
            entity.modifiedAt = new Date();
            const mapped = automapper.map(dto.name, model.name, entity);

            const result = await this.databaseService.patchOne(model, { _id: new ObjectID(id) }, mapped);

            return result;
        }

        return null;
    }

    async deleteEntity(model: ObjectType<EntityModel>, id: string): Promise<any> {
        if (ObjectID.isValid(id)) {
            const updatedEntity = await this.databaseService.getOne(model, { _id: new ObjectID(id) }) as EntityModel;
            updatedEntity.deletedAt = new Date();
            updatedEntity.deleted = true;

            await this.databaseService.patchOne(model, { _id: new ObjectID(id) }, updatedEntity);
        }
    }
}
