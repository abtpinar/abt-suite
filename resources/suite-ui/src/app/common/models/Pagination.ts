export class Pagination<T> {
    public elements: T[] = [];
    public page: number;
    public perPage: number;
    public totalPages: number;
    public totalElements: number;
}
