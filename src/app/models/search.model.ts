export class SearchModel {
    private searchField: string;
    private searchType: 'STARTS_WITH' | 'CONTAINS';
    private searchValue: string;

    constructor() {
        this.searchField = '';
        this.searchType = 'STARTS_WITH';
        this.searchValue = '';
    }

    get queryField(): string {
        return this.searchField;
    }

    set queryField(value: string) {
        this.searchField = value || '';
    }

    get queryType(): 'STARTS_WITH' | 'CONTAINS' {
        return this.searchType;
    }

    set queryType(value: 'STARTS_WITH' | 'CONTAINS') {
        this.searchType = value || 'STARTS_WITH';
    }

    get queryValue(): string {
        return this.searchValue;
    }

    set queryValue(value: string) {
        this.searchValue = value || '';
    }
}
