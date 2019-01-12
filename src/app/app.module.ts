import { Module } from '@nestjs/common';

import { RabbitMessageQueue } from '../shared/mq/rabbit.mq.component';
import { LoggingService } from '../shared/logging/logging.service';
import { DatabaseService } from '../shared/database/database.service';
import { SharedModule } from '../shared/shared.module';
import { EntitiesModule } from './entities/entities.module';
import { ListenerService } from '../listeners/listener.service';
import { ListenersModule } from '../listeners/listener.module';
import 'automapper-ts';

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
                      .forMember('_id', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore);
                config.createMap('DomainModel', 'DomainDto')
                      .forMember('_id', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore);
                config.createMap('StandardModel', 'StandardDto')
                      .forMember('_id', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore);
                config.createMap('LocationModel', 'LocationDto')
                      .forMember('_id', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.ignore)
                      .forMember('location', (opts: AutoMapperJs.IMemberConfigurationOptions) => opts.sourceObject.location.coordinates);
            });

            this.loggingService.getLogger().info(`Successfully initialised ci-private-service`);
        } catch (e) {
            this.loggingService.getLogger().error(`Error initializing ci-private-service: ${e}`);
        }
    }
}
