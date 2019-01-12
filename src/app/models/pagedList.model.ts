import * as urlAssembler from 'url-assembler';

import { PaginationMetadata } from './paginationMetadata.model';
import { EntityDto } from './entity.dto';

export class PagedList<T> extends Array<T> {
    public totalPages: number;

    get hasPrevious(): boolean {
        return this.currentPage > 1;
    }

    get hasNext(): boolean {
        return this.currentPage < this.totalPages;
    }

    constructor(items: T[], public totalCount: number, public currentPage: number, public pageSize: number) {
        super(...items);
        this.totalPages = Math.ceil(this.totalCount / this.pageSize);
    }

    public static create<T>(items: T[], count: number, page: number, size: number) {
        return new PagedList(items, count, page, size);
    }
}

export function buildPaginationMetadata<T extends EntityDto>(paginatedList: PagedList<T>, collectionName: string): PaginationMetadata {
    const result: PaginationMetadata = {
        currentPage: paginatedList.currentPage,
        pageSize: paginatedList.pageSize,
        totalCount: paginatedList.totalCount,
        totalPages: paginatedList.totalPages,
        nextPageLink: '',
        previousPageLink: '',
    };

    let url = urlAssembler()
            .prefix(`/entities`)
            .template(`/${collectionName}`);

    if (paginatedList.hasNext) {
        url = url
                .param('pageNumber', `${paginatedList.currentPage + 1}`, false)
                .param('pageSize', `${paginatedList.pageSize}`, false);

        result.nextPageLink = url.toString();
    }

    if (paginatedList.hasPrevious) {
        url = url
        .param('pageNumber', `${paginatedList.currentPage - 1}`, false)
        .param('pageSize', `${paginatedList.pageSize}`, false);

        result.previousPageLink = url.toString();
    }

    return result;
}
