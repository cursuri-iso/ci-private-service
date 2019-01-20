import { PipeTransform, ArgumentMetadata, Injectable, BadRequestException } from '@nestjs/common';

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

        if (this.validate(result)) {
            return result;
        }

        return null;
    }

    private validate(value: SortingModel): boolean {
        return value.sortBy !== '';
  }
}
