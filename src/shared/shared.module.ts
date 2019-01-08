import { Module, Global } from '@nestjs/common';
import { ConfigurationService } from './configuration/configuration.service';
import { configurationServiceFactory } from './configuration/configuration-service.factory';
import { LoggingService } from './logging/logging.service';
import { logginsServiceFactory } from './logging/logging.factory';
import { DatabaseService } from './database/database.service';
import { databaseServiceFactory } from './database/database.factory';
import { RabbitMessageQueue } from './mq/rabbit.mq.component';
import { messageFactory } from './mq/mq-factory.component';

@Global()
@Module({
    providers: [
        { provide: ConfigurationService, useFactory: configurationServiceFactory },
        { provide: LoggingService, useFactory: logginsServiceFactory, inject: [ ConfigurationService ] },
        { provide: DatabaseService, useFactory: databaseServiceFactory, inject: [ ConfigurationService, LoggingService ] },
        { provide: RabbitMessageQueue, useFactory: messageFactory, inject: [ ConfigurationService, LoggingService ] },
    ],
    exports: [
        LoggingService,
        RabbitMessageQueue,
        DatabaseService,
    ],
})
export class SharedModule {}
