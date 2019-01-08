import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../shared/database/database.service';
import { OrganisationDto } from '../models/organisation.dto';
import { OrganisationModel } from '../models/organisation.model';

@Injectable()
export class OrganisationsService {
    constructor(private databaseService: DatabaseService) {}

    public async createOrganisation(organisation: OrganisationDto) {
        await this.databaseService.add(OrganisationModel, organisation);
    }
}
