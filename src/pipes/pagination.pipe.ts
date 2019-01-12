import { Pipe, PipeTransform, ArgumentMetadata } from '@nestjs/common';

import { PaginationModel } from '../app/models/pagination.model';

@Pipe()
export class PaginationPipe implements PipeTransform<any> {
    transform(value: any, metadata: ArgumentMetadata) {
        const result: PaginationModel = new PaginationModel();

        if (value.pageNumber) {
            result.pageNumber = value.pageNumber;
        }

        if (value.pageSize) {
            result.pageSize = value.pageSize;
        }

        return result;
    }
}
