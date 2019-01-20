import { Controller, Post, Body, Get, Res, Query, HttpStatus, Param, Delete } from '@nestjs/common';

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
import { SortingPipe } from '../../pipes/sorting.pipe';
import { SortingModel } from '../models/sorting.model';
import { SearchPipe } from '../../pipes/search.pipe';
import { SearchModel } from '../models/search.model';

@Controller('entities')
export class EntitiesController {
    constructor(private service: EntitiesService) {}

    @Get('/organisations')
    async getOrganisations(@Res() resp,
                           @Query(new PaginationPipe()) pagination?: PaginationModel,
                           @Query(new SortingPipe()) sorting?: SortingModel,
                           @Query(new SearchPipe()) search?: SearchModel ) {
        const result: PagedList<EntityDto> = await this.service.getEntities(OrganisationModel, OrganisationDto, pagination, sorting, search);
        const meta = buildPaginationMetadata(result, 'organisations');

        resp.set('x-pagination', JSON.stringify(meta));
        resp.status(HttpStatus.OK).json(result);
    }

    @Get('/organisations/:id')
    async getOrganisation(@Param('id') id): Promise<EntityDto> {
        return await this.service.getEntity(OrganisationModel, OrganisationDto, id);
    }

    @Post('/organisations')
    async createOrganisation(@Body() dto: OrganisationDto) {
        await this.service.createEntity(OrganisationModel, dto);
    }

    @Delete('/organisations/:id')
    async removeOrganisation(@Param('id') id) {
        await this.service.deleteEntity(OrganisationModel, id);
    }

    @Get('/standards')
    async getStandards(@Res() resp,
                       @Query(new PaginationPipe()) pagination?: PaginationModel,
                       @Query(new SortingPipe()) sorting?: SortingModel,
                       @Query(new SearchPipe()) search?: SearchModel) {
        const result: PagedList<EntityDto> = await this.service.getEntities(StandardModel, StandardDto, pagination, sorting, search);
        const meta = buildPaginationMetadata(result, 'standards');

        resp.set('x-pagination', JSON.stringify(meta));
        resp.status(HttpStatus.OK).json(result);
    }

    @Get('/standards/:id')
    async getStandard(@Param('id') id): Promise<EntityDto> {
        return await this.service.getEntity(StandardModel, StandardDto, id);
    }

    @Post('/standards')
    async createStandard(@Body() dto: StandardDto) {
        await this.service.createEntity(StandardModel, dto);
    }

    @Delete('/standards/:id')
    async removeStandard(@Param('id') id) {
        await this.service.deleteEntity(StandardModel, id);
    }

    @Get('/domains')
    async getDomains(@Res() resp,
                     @Query(new PaginationPipe()) pagination?: PaginationModel,
                     @Query(new SortingPipe()) sorting?: SortingModel,
                     @Query(new SearchPipe()) search?: SearchModel ) {
        const result: PagedList<EntityDto> = await this.service.getEntities(DomainModel, DomainDto, pagination, sorting, search);
        const meta = buildPaginationMetadata(result, 'domains');

        resp.set('x-pagination', JSON.stringify(meta));
        resp.status(HttpStatus.OK).json(result);
    }

    @Get('/domains/:id')
    async getDomain(@Param('id') id): Promise<EntityDto> {
        return await this.service.getEntity(DomainModel, DomainDto, id);
    }

    @Post('/domains')
    async createDomain(@Body() dto: DomainDto) {
        await this.service.createEntity(DomainModel, dto);
    }

    @Delete('/domains/:id')
    async removeDomain(@Param('id') id) {
        await this.service.deleteEntity(DomainModel, id);
    }

    @Get('/locations')
    async getLocations(@Res() resp,
                       @Query(new PaginationPipe()) pagination?: PaginationModel,
                       @Query(new SortingPipe()) sorting?: SortingModel,
                       @Query(new SearchPipe()) search?: SearchModel ) {
        const result: PagedList<EntityDto> = await this.service.getEntities(LocationModel, LocationDto, pagination, sorting, search);
        const meta = buildPaginationMetadata(result, 'locations');

        resp.set('x-pagination', JSON.stringify(meta));
        resp.status(HttpStatus.OK).json(result);
    }

    @Get('/locations/:id')
    async getLocation(@Param('id') id): Promise<EntityDto> {
        return await this.service.getEntity(LocationModel, LocationDto, id);
    }

    @Post('/locations')
    async createLocation(@Body() dto: LocationDto) {
        await this.service.createEntity(LocationModel, dto);
    }

    @Delete('/locations/:id')
    async removeLocation(@Param('id') id) {
        await this.service.deleteEntity(LocationModel, id);
    }
}
