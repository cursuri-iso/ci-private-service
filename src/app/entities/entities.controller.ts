import { Controller, Post, Body, Get, Res, Query, HttpStatus, Param, Delete, Patch } from '@nestjs/common';

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
import { TrainingDto } from '../models/training.dto';
import { TrainingModel } from '../models/training.model';

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
    async getOrganisation(@Param('id') id: string): Promise<EntityDto> {
        return await this.service.getEntity(OrganisationModel, OrganisationDto, id);
    }

    @Post('/organisations')
    async createOrganisation(@Body() dto: OrganisationDto) {
        await this.service.createEntity(OrganisationModel, OrganisationDto, dto);
    }

    @Patch('/organisations/:id')
    async patchOrganisation(@Body() dto: any, @Param('id') id: string) {
        await this.service.patchEntity(OrganisationModel, OrganisationDto, dto, id);
    }

    @Delete('/organisations/:id')
    async removeOrganisation(@Param('id') id: string) {
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
    async getStandard(@Param('id') id: string): Promise<EntityDto> {
        return await this.service.getEntity(StandardModel, StandardDto, id);
    }

    @Post('/standards')
    async createStandard(@Body() dto: StandardDto) {
        await this.service.createEntity(StandardModel, StandardDto, dto);
    }

    @Patch('/standards/:id')
    async patchStandard(@Body() dto: any, @Param('id') id: string) {
        await this.service.patchEntity(StandardModel, StandardModel, dto, id);
    }

    @Delete('/standards/:id')
    async removeStandard(@Param('id') id: string) {
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
    async getDomain(@Param('id') id: string): Promise<EntityDto> {
        return await this.service.getEntity(DomainModel, DomainDto, id);
    }

    @Post('/domains')
    async createDomain(@Body() dto: DomainDto) {
        await this.service.createEntity(DomainModel, DomainDto, dto);
    }

    @Patch('/domains/:id')
    async patchDomain(@Body() dto: any, @Param('id') id: string) {
        await this.service.patchEntity(DomainModel, DomainDto, dto, id);
    }

    @Delete('/domains/:id')
    async removeDomain(@Param('id') id: string) {
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
    async getLocation(@Param('id') id: string): Promise<EntityDto> {
        return await this.service.getEntity(LocationModel, LocationDto, id);
    }

    @Post('/locations')
    async createLocation(@Body() dto: LocationDto) {
        await this.service.createEntity(LocationModel, LocationDto, dto);
    }

    @Patch('/locations/:id')
    async patchLocation(@Body() dto: any, @Param('id') id: string) {
        await this.service.patchEntity(LocationModel, LocationDto, dto, id);
    }

    @Delete('/locations/:id')
    async removeLocation(@Param('id') id: string) {
        await this.service.deleteEntity(LocationModel, id);
    }

    @Get('/trainings')
    async getTrainings(@Res() resp,
                       @Query(new PaginationPipe()) pagination?: PaginationModel,
                       @Query(new SortingPipe()) sorting?: SortingModel,
                       @Query(new SearchPipe()) search?: SearchModel ) {
        const result: PagedList<EntityDto> = await this.service.getEntities(TrainingModel, TrainingDto, pagination, sorting, search);
        const meta = buildPaginationMetadata(result, 'trainings');

        resp.set('x-pagination', JSON.stringify(meta));
        resp.status(HttpStatus.OK).json(result);
    }

    @Get('/trainings/:id')
    async getTraining(@Param('id') id: string): Promise<EntityDto> {
        return await this.service.getEntity(TrainingModel, TrainingDto, id);
    }

    @Post('/trainings')
    async createTraining(@Body() dto: TrainingDto) {
        await this.service.createEntity(TrainingModel, TrainingDto, dto);
    }

    @Patch('/trainings/:id')
    async patchTraining(@Body() dto: any, @Param('id') id: string) {
        await this.service.patchEntity(TrainingModel, TrainingDto, dto, id);
    }

    @Delete('/trainings/:id')
    async removeTraining(@Param('id') id: string) {
        await this.service.deleteEntity(TrainingModel, id);
    }
}
