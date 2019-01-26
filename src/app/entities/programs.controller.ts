import { Controller, Post, Body, Get, Res, Query, HttpStatus, Param, Delete, Patch } from '@nestjs/common';

import { ProgramsService } from './programs.service';
import { ProgramDto } from '../models/program.dto';

@Controller('programs')
export class ProgramsController {
    constructor(private service: ProgramsService) {}

    @Get('/:org_id/:training_id')
    async getProgram(@Param('org_id') orgId: string, @Param('training_id') trainingId: string) {
        return await this.service.getProgram(orgId, trainingId);
    }

    @Post()
    async createProgram(@Body() dto: ProgramDto) {
        await this.service.createProgram(dto);
    }
}
