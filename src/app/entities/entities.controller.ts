import { Controller, Post, Body, Get, Res, Query, HttpStatus } from '@nestjs/common';

import { EntitiesService } from './entities.service';
import { OrganisationDto } from '../models/organisation.dto';
import { OrganisationModel } from '../models/organisation.model';
import { StandardDto } from '../models/standard.dto';
import { StandardModel } from '../models/standard.model';
import { DomainDto } from '../models/domain.dto';
import { DomainModel } from '../models/domain.model';
import { LocationDto } from '../models/location.dto';
import { LocationModel } from '../models/location.model';
import { PaginationPipe } from '../../pipes/pagination.pipe';
import { PaginationModel } from '../models/pagination.model';
import { PagedList, buildPaginationMetadata } from '../models/pagedList.model';
import { EntityDto } from '../models/entity.dto';
import 'automapper-ts';

@Controller('entities')
export class EntitiesController {
    constructor(private service: EntitiesService) {}

    @Get('/organisations')
    async getOrganisations(@Res() resp, @Query(new PaginationPipe()) pagination?: PaginationModel ) {
        const result: PagedList<EntityDto> = await this.service.getEntities(OrganisationModel, OrganisationDto, pagination);
        const meta = buildPaginationMetadata(result, 'organisations');

        resp.set('x-pagination', JSON.stringify(meta));
        resp.status(HttpStatus.OK).json(result);
    }

    @Post('/organisations')
    async createOrganisation(@Body() dto: OrganisationDto) {
        await this.service.createEntity(OrganisationModel, dto);
    }

    @Post('/standards')
    async createStandard(@Body() dto: StandardDto) {
        await this.service.createEntity(StandardModel, dto);
    }

    @Post('/domains')
    async createDomain(@Body() dto: DomainDto) {
        await this.service.createEntity(DomainModel, dto);
    }

    @Post('/locations')
    async createLocation(@Body() dto: LocationDto) {
        await this.service.createEntity(LocationModel, dto);
    }
}
