import { PipeTransform, ArgumentMetadata, Injectable, BadRequestException } from '@nestjs/common';

import { SearchModel } from '../app/models/search.model';

@Injectable()
export class SearchPipe implements PipeTransform<any> {
    transform(value: any, metadata: ArgumentMetadata) {
        const result: SearchModel = new SearchModel();

        if (value.queryField) {
            result.queryField = value.queryField;
        }

        if (value.queryType) {
            result.queryType = value.queryType;
        }

        if (value.queryValue) {
            result.queryValue = value.queryValue;
        }

        if (this.validate(result)) {
            return result;
        }

        return null;
    }

    private validate(value: SearchModel): boolean {
        return value.queryField !== '' && value.queryValue !== '';
    }
}
