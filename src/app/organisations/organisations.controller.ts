import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { OrganisationsService } from './organisations.service';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { OrganisationDto } from '../models/organisation.dto';

@Controller('entities')
export class OrganisationsController {
    constructor(private service: OrganisationsService) { }

    @Post('/organisations')
    @UsePipes(new ValidationPipe())
    async createOrganisation(@Body() organisationDto: OrganisationDto) {
        await this.service.createOrganisation(organisationDto);
    }
}
