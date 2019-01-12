import { MAX_PAGE_SIZE } from '../../common/constants';

export class PaginationModel {
    private readonly maxPageSize: number = MAX_PAGE_SIZE;
    private pageNo: number;
    private pageSz: number;

    constructor() {
        this.pageNo = 1;
        this.pageSz = this.maxPageSize;
    }

    get pageNumber(): number {
        return this.pageNo;
    }

    set pageNumber(value: number) {
        const pageNr: number = Number.parseInt(value.toString(), 10);

        if (pageNr) {
            this.pageNo = pageNr < 1 ? 1 : pageNr;
        } else {
            this.pageNo = 1;
        }
    }

    get pageSize(): number {
        return this.pageSz;
    }

    set pageSize(value: number) {
        const pageSize: number = Number.parseInt(value.toString(), 10);

        if (pageSize) {
            this.pageSz = pageSize > this.maxPageSize ? this.maxPageSize : pageSize;
        } else {
            this.pageSz = this.maxPageSize;
        }
    }
}
