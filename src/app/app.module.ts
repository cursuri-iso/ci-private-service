import { Module } from '@nestjs/common';

import { RabbitMessageQueue } from '../shared/mq/rabbit.mq.component';
import { LoggingService } from '../shared/logging/logging.service';
import { DatabaseService } from '../shared/database/database.service';
import { SharedModule } from '../shared/shared.module';
import { EntitiesModule } from './entities/entities.module';
import { ListenerService } from '../listeners/listener.service';
import { ListenersModule } from '../listeners/listener.module';
import 'automapper-ts';
import { type } from 'os';

@Module({
    imports: [ SharedModule, EntitiesModule, ListenersModule ],
})
export class AppModule {
    constructor(private mqService: RabbitMessageQueue, private loggingService: LoggingService, private databaseService: DatabaseService, private listener: ListenerService) {}

    async onModuleInit() {
        try {
            this.loggingService.getLogger().info(`Initializing ci-private-service ...`);

            await this.mqService.initializeConnection();
            await this.databaseService.connect();
            await this.listener.listen();

            automapper.initialize((config: AutoMapperJs.IConfiguration) => {
                config.createMap('OrganisationModel', 'OrganisationDto')
                      .forMember('_id', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore)
                      .forMember('createdAt', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore)
                      .forMember('modifiedAt', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore)
                      .forMember('deletedAt', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore)
                      .forMember('logoUrl', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('logo_url'))
                      .forMember('scheduleUrl', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('schedule_url'))
                      .forMember('registrationUrl', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('registration_url'));

                config.createMap('OrganisationDto', 'OrganisationModel')
                      .forMember('logo_url', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.condition(source => source.logoUrl !== undefined))
                      .forMember('logo_url', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('logoUrl'))
                      .forMember('schedule_url', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.condition(source => source.scheduleUrl !== undefined))
                      .forMember('schedule_url', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('scheduleUrl'))
                      .forMember('registration_url', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.condition(source => source.registrationUrl !== undefined))
                      .forMember('registration_url', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.mapFrom('registrationUrl'));

                config.createMap('DomainModel', 'DomainDto')
                      .forMember('_id', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore)
                      .forMember('createdAt', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore)
                      .forMember('modifiedAt', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore)
                      .forMember('deletedAt', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore);

                config.createMap('DomainDto', 'DomainModel');

                config.createMap('StandardModel', 'StandardDto')
                      .forMember('_id', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore)
                      .forMember('createdAt', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore)
                      .forMember('modifiedAt', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore)
                      .forMember('deletedAt', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore);

                config.createMap('StandardDto', 'StandardModel');

                config.createMap('LocationModel', 'LocationDto')
                      .forMember('_id', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore)
                      .forMember('createdAt', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore)
                      .forMember('modifiedAt', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore)
                      .forMember('deletedAt', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore)
                      .forMember('location', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore)
                      .forMember('longitude', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.sourceObject.location.coordinates[0])
                      .forMember('latitude', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.sourceObject.location.coordinates[1]);

                config.createMap('LocationDto', 'LocationModel')
                      .forMember('location', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.condition(source => source.longitude !== undefined && source.latitude !== undefined))
                      .forMember('location', (opts: AutoMapperJs.IMemberConfigurationOptions) => ({ type: 'Point', coordinates: [opts.sourceObject.longitude, opts.sourceObject.latitude] } as any))
                      .forMember('longitude', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore)
                      .forMember('latitude', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore);

                config.createMap('TrainingModel', 'TrainingDto')
                      .forMember('_id', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore)
                      .forMember('createdAt', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore)
                      .forMember('modifiedAt', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore)
                      .forMember('deletedAt', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore);

                config.createMap('TrainingDto', 'TrainingModel');

                config.createMap('ProgramDto', 'ProgramModel')
                      .forMember('schedules', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.sourceObject.schedules.forEach(schedule => schedule.startDate = new Date(schedule.startDate)));
            });

            this.loggingService.getLogger().info(`Successfully initialised ci-private-service`);
        } catch (e) {
            this.loggingService.getLogger().error(`Error initializing ci-private-service: ${e}`);
        }
    }
}
