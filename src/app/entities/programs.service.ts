import { Injectable } from '@nestjs/common';

import { DatabaseService } from '../../shared/database/database.service';
import { RabbitMessageQueue } from '../../shared/mq/rabbit.mq.component';
import { ProgramModel } from '../models/program.model';
import { ScheduleDto } from '../models/schedule.dto';
import { PagedList } from '../models/pagedList.model';
import { ProgramDto } from '../models/program.dto';

@Injectable()
export class ProgramsService {
    constructor(private databaseService: DatabaseService, private mqService: RabbitMessageQueue) { }

    // async getSchedules(orgId: string, trainingId: string): Promise<PagedList<ScheduleDto>> {
    //     const filter = {
    //         org_id: orgId,
    //         training_id: trainingId,
    //     };

    //     const result = await this.databaseService.find(ProgramModel, filter,);
    //     const mapped = automapper.map(model.name, dto.name, result[0]);

    //     return PagedList.create<EntityDto>(mapped, result[1], pagination.pageNumber, pagination.pageSize);
    // }

    async createProgram(program: ProgramDto) {
        program.createdAt = new Date();
        const mapped = automapper.map(ProgramDto, ProgramModel, program);

        await this.databaseService.add(ProgramModel, mapped);
    }
}
