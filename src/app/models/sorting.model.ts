export class SortingModel {
    private sortingField: string;
    private sortingDirection: 'ASC' | 'DESC';

    constructor() {
        this.sortingField = '';
        this.sortingDirection = 'ASC';
    }

    get sortBy(): string {
        return this.sortingField;
    }

    set sortBy(value: string) {
        this.sortingField = value || '';
    }

    get sortOrder(): 'ASC' | 'DESC' {
        return this.sortingDirection;
    }

    set sortOrder(value: 'ASC' | 'DESC') {
        this.sortingDirection = value || 'ASC';
    }
}
