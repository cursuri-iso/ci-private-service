import { ObjectId } from 'mongodb';

export abstract class EntityModel {
    // tslint:disable-next-line:variable-name
    abstract _id?: ObjectId;
}
