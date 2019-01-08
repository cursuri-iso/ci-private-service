import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import { createConnection, ConnectionOptions, Connection, ObjectLiteral } from 'typeorm';

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

    public async find(collection: any, condition: any, ord?: object, page?: any): Promise<any[]> {
        await this.connect();
        condition.deleted = null;

        const options: any = {
            where: condition,
            order: { updated_date: 'DESC' },
        };

        ord = ord ? ord : { updated_date: 'DESC' };
        options.order = ord;

        if (page) {
            options.take = page.take;
            options.skip = page.skip;
        }

        const result = await this.connection.getMongoRepository(collection).find(options);
        return result;
    }

    public async updateOne(collection: any, condition: ObjectLiteral, update: ObjectLiteral) {
        await this.connect();

        condition.deleted = null;
        update = { $set: update };

        const result = await this.connection.getMongoRepository(collection).findOneAndUpdate(condition, update);
        return result;
    }
}
