import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import { createConnection, ConnectionOptions, Connection, ObjectLiteral, FindManyOptions } from 'typeorm';

import { PaginationModel } from '../../app/models/pagination.model';
import { SearchModel } from '../../app/models/search.model';
import { SortingModel } from '../../app/models/sorting.model';

@Injectable()
export class DatabaseService {
    private connection: Connection;

    constructor(private options: ConnectionOptions, private logger: winston.Logger) { }

    public async connect(): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                if (! (this.connection && this.connection.isConnected)) {
                    this.connection = await createConnection(this.options);
                    this.logger.info(`Connected to ${this.options.database} database`);
                }

                resolve();
            } catch (err) {
                this.logger.error(`Could not connect to ${this.options.database}: ${JSON.stringify(err)}`);
                reject(`Cannot open db connection`);
            }
        });
    }

    public async add(collection: any, record: any) {
        await this.connect();

        const result = await this.connection.getMongoRepository(collection).save(record);
        return result;
    }

    public async aggregate(collection: any, pipeline: ObjectLiteral[], options?: any): Promise<any[]> {
        await this.connect();

        const result = await this.connection.getMongoRepository(collection).aggregate(pipeline).toArray();
        return result;
    }

    public async getOne(collection: any, condition: any): Promise<{}> {
        await this.connect();

        condition.deleted = null;

        const options = {
            where: condition,
        };

        const result = await this.connection.getMongoRepository(collection).findOne(options);
        return result;
    }

    public async find(collection: any, condition?: SearchModel, ord?: SortingModel, page?: PaginationModel): Promise<[any[], number]> {
        await this.connect();

        const where: any = {
            deleted: null,
        };

        const order: any = {
            updated_date: 'DESC',
        };

        if (condition) {
            const regexString = `${ condition.queryType === 'CONTAINS' ? '' : '^' }${ condition.queryValue }`;
            const regex = {
                $regex: regexString,
                $options: 'i',
            };

            where[condition.queryField] = regex;
        }

        if (ord) {
            order[ord.sortBy] = ord.sortOrder;
        }

        const options: FindManyOptions = {
            where,
            order,
        };

        if (page) {
            options.take = page.pageSize;
            options.skip = (page.pageNumber - 1) * page.pageSize;
        }

        return await this.connection.getMongoRepository(collection).findAndCount(options);
    }

    public async patchOne(collection: any, condition: ObjectLiteral, update: any): Promise<any> {
        await this.connect();

        condition.deleted = null;
        update = { $set: update };

        const result = await this.connection.getMongoRepository(collection).findOneAndUpdate(condition, update);
        return result.value;
    }
}
