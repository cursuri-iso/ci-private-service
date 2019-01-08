import { Controller, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';

import { EntitiesService } from './entities.service';
import { OrganisationDto } from '../models/organisation.dto';
import { OrganisationModel } from '../models/organisation.model';
import { StandardDto } from '../models/standard.dto';
import { StandardModel } from '../models/standard.model';

@Controller('entities')
export class EntitiesController {
    constructor(private service: EntitiesService) {}

    @Post('/organisations')
    @UsePipes(new ValidationPipe())
    async createOrganisation(@Body() dto: OrganisationDto) {
        await this.service.createEntity(OrganisationModel, dto);
    }

    @Post('/standards')
    @UsePipes(new ValidationPipe())
    async createStandard(@Body() dto: StandardDto) {
        await this.service.createEntity(StandardModel, dto);
    }
}
