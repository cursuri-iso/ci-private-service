import { Module } from '@nestjs/common';
import { EntitiesService } from './entities.service';
import { EntitiesController } from './entities.controller';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';

@Module({
  providers: [
    EntitiesService,
    ProgramsService,
  ],
  controllers: [
    EntitiesController,
    ProgramsController,
  ],
})
export class EntitiesModule {}
