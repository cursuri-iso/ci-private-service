import { Injectable } from '@nestjs/common';

import { DatabaseService } from '../../shared/database/database.service';
import { RabbitMessageQueue } from '../../shared/mq/rabbit.mq.component';
import { ProgramModel } from '../models/program.model';
import { ScheduleDto } from '../models/schedule.dto';
import { PagedList } from '../models/pagedList.model';
import { ProgramDto } from '../models/program.dto';
import { SortingModel } from '../models/sorting.model';
import { PaginationModel } from '../models/pagination.model';
import { SearchModel } from '../models/search.model';
import { ObjectID } from 'mongodb';

@Injectable()
export class ProgramsService {
    constructor(private databaseService: DatabaseService, private mqService: RabbitMessageQueue) { }

    async getProgram(orgId: string, trainingId: string): Promise<ProgramDto> {
        if (ObjectID.isValid(orgId) && ObjectID.isValid(trainingId)) {
            const result = await this.databaseService.getOne(ProgramModel, { org_id: orgId, training_id: trainingId });
            const mapped = automapper.map(ProgramModel, ProgramDto, result);

            return mapped;
        }

        return null;
    }
    // async getSchedules(orgId: string,
    //                    trainingId: string,
    //                    pagination: PaginationModel,
    //                    sorting?: SortingModel,
    //                    search?: SearchModel): Promise<PagedList<ScheduleDto>> {
    //     const filter = {
    //         org_id: orgId,
    //         training_id: trainingId,
    //     };

    //     const result = await this.databaseService.find(ProgramModel, filter,);
    //     const mapped = automapper.map(model.name, dto.name, result[0]);

    //     return PagedList.create<ScheduleDto>(mapped, result[1], pagination.pageNumber, pagination.pageSize);
    // }

    async createProgram(program: ProgramDto) {
        program.createdAt = new Date();
        const mapped = automapper.map(ProgramDto, ProgramModel, program);

        await this.databaseService.add(ProgramModel, mapped);
    }
}
