import { ConnectionOptions } from 'typeorm';
import { DatabaseService } from './database.service';
import { ConfigurationService } from '../configuration/configuration.service';
import { LoggingService } from '../logging/logging.service';
import { DomainModel } from '../../app/models/domain.model';
import { StandardModel } from '../../app/models/standard.model';
import { LocationModel } from '../../app/models/location.model';
import { OrganisationModel } from '../../app/models/organisation.model';
import { TrainingModel } from '../../app/models/training.model';

export const databaseServiceFactory = async (configManager: ConfigurationService, loggingService: LoggingService) => {

    const config = configManager.getSettings();
    const logger = loggingService.getLogger();

    const options: ConnectionOptions = {

        type: process.env.DB_TYPE || config.db.type,
        host: process.env.DB_HOST || config.db.host,
        port: process.env.DB_PORT || config.db.port,
        username: process.env.DB_USER || config.db.user,
        password: process.env.DB_PASSWORD || config.db.password,
        database: process.env.DB_DATABASE || config.db.database,
        poolSize: process.env.DB_POOL || config.db.poolSize,
        reconnectInterval: process.env.DB_RETRY_TIMEOUT || config.db.retryTimeout || 5000,
        reconnectTries: process.env.DB_RETRY_COUNT || config.db.retryCount || 20,
        entities: [
            DomainModel,
            StandardModel,
            LocationModel,
            OrganisationModel,
            TrainingModel,
        ],
        synchronize: true,
        useNewUrlParser: true,
    };

    const databaseService = new DatabaseService(options, logger);
    return databaseService;
};
