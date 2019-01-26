import { Controller, Post, Body, Get, Res, Query, HttpStatus, Param, Delete, Patch } from '@nestjs/common';

import { ProgramsService } from './programs.service';
import { ProgramDto } from '../models/program.dto';

@Controller('programs')
export class ProgramsController {
    constructor(private service: ProgramsService) {}

    @Post()
    async createProgram(@Body() dto: ProgramDto) {
        await this.service.createProgram(dto);
    }
}
