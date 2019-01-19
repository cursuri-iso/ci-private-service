import { PipeTransform, ArgumentMetadata, Injectable } from '@nestjs/common';

import { SortingModel } from '../app/models/sorting.model';

@Injectable()
export class SortingPipe implements PipeTransform<any> {
    transform(value: any, metadata: ArgumentMetadata) {
        const result: SortingModel = new SortingModel();

        if (value.sortBy) {
            result.sortBy = value.sortBy;
        }

        if (value.sortOrder) {
            result.sortOrder = value.sortOrder;
        }

        return result;
    }
}
