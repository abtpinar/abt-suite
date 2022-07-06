export class PaginationData {
    public numberOfPages: number;
    public currentPageNumber: number;
    public pageRange: number;
    public startingIndex: number;
    public endingIndex: number;

    constructor(numberOfPages: number, currentPageNumber: number, pageRange: number) {
        this.numberOfPages = numberOfPages;
        this.currentPageNumber = currentPageNumber;
        this.pageRange = pageRange > numberOfPages ? numberOfPages : pageRange;

        this.initializePaginationRange();
    }

    private initializePaginationRange() {
        const delta = this.getDelta();
        if (this.currentPageNumber - delta > this.numberOfPages - this.pageRange) {
            this.startingIndex = this.numberOfPages - this.pageRange;
            this.endingIndex = this.numberOfPages;
        } else {
            this.startingIndex = this.currentPageNumber - delta;
            this.endingIndex = this.startingIndex + this.pageRange;
        }
    }

    private getDelta() {
        const halfPageRange = Math.round(this.pageRange / 2);
        return this.currentPageNumber - halfPageRange < 0
            ? this.currentPageNumber
            : halfPageRange;
    }
}
