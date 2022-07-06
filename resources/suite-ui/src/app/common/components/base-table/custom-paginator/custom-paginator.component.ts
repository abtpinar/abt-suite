import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges
} from '@angular/core';
import { ServerPaginationInfo } from '../../../models/ServerPaginationInfo';

@Component({
  selector: 'app-custom-paginator',
  templateUrl: './custom-paginator.component.html',
  styleUrls: ['./custom-paginator.component.css']
})
export class CustomPaginatorComponent implements OnInit {
  @Input()
  paginationInfo: ServerPaginationInfo;

  @Input() pageSizes: number[];

  @Output()
  pageChange = new EventEmitter();

  @Input() maxSize: number = 7;

  page: number = 1;

  constructor() {}

  ngOnInit() {}

  pageChanged(event: any/*PageChangedEvent*/) {
    this.page = event.page;
    this.pageChange.emit(event);
  }

  get pageStartIndex() {
    return this.totalItems === 0 || this.paginationInfo.per_page === 0 ? 0
      : (this.paginationInfo.current_page - 1) * this.paginationInfo.per_page + 1;
  }

  get pageEndIndex() {
    const length = Math.max(this.totalItems, 0);11
    return this.pageStartIndex < length ?
      Math.min(this.pageStartIndex + this.paginationInfo.per_page - 1, length)
      : this.pageStartIndex;
  }

  get totalItems() {
    return this.paginationInfo.total;
  }

  get totalPages() {
    return this.paginationInfo.total % this.paginationInfo.per_page > 0 ?
      Math.trunc(this.paginationInfo.total / this.paginationInfo.per_page) + 1
      : Math.trunc(this.paginationInfo.total / this.paginationInfo.per_page);
  }

  get pages() {
    let pages = [];

    for (let index = 1; index <= this.totalPages; index++) {
      if ((this.page < 5 && index < this.maxSize + 1) || (this.page > 4 && index > this.page - 4 && index < this.page + 4))
        pages.push({ page: index, active: index == this.page });
    }

    return pages;
  }

  get first() {
    return 1;
  }

  get previous() {
    return this.page > 1 ? this.page - 1 : 1;
  }

  get next() {
    return this.page < this.totalPages ? this.page + 1 : this.totalPages;
  }

  get last() {
    return this.totalPages;
  }

}
