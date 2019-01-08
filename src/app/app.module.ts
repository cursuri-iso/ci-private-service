import { Module } from '@nestjs/common';
import { RabbitMessageQueue } from '../shared/mq/rabbit.mq.component';
import { LoggingService } from '../shared/logging/logging.service';
import { DatabaseService } from '../shared/database/database.service';
import { SharedModule } from '../shared/shared.module';

@Module({
    imports: [ SharedModule ],
})
export class AppModule {
    constructor(private mqService: RabbitMessageQueue, private loggingService: LoggingService, private databaseService: DatabaseService) {}

    async onModuleInit() {
        try {
            this.loggingService.getLogger().info(`Initializing ci-private-service`);

            await this.mqService.initializeConnection();
            await this.mqService.ensureInfrastructure();

            await this.databaseService.connect();
        } catch (e) {
            this.loggingService.getLogger().error(`Error initializing ci-private-service: ${e}`);
        }
    }
}
