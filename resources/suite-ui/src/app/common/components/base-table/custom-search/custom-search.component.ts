import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { FiltersConfiguration } from '../base-table-config';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-custom-search',
  templateUrl: './custom-search.component.html',
  styleUrls: ['./custom-search.component.sass']
})
export class CustomSearchComponent implements OnInit, OnDestroy {
  private searchTerms = {};

  private filterClearNotifier: Subject<boolean> = new Subject<boolean>();

  filterClearNotifier$: Observable<
    boolean
  > = this.filterClearNotifier.asObservable();

  additionalFiltersShown: boolean = false;

  @Input('sortInfo')
  sortInfo$: Observable<{ field: string; order: string }>;

  @Input()
  filtersConfig: FiltersConfiguration;

  @Input()
  has_checkbox: boolean = false;

  @Output()
  search = new EventEmitter();

  @Output()
  clear = new EventEmitter();

  @Output()
  dataChanged = new EventEmitter();

  @Output()
  additionalFiltersToggle = new EventEmitter<boolean>();

  private _unsubscribeAll$: Subject<any> = new Subject();

  constructor() {}

  ngOnInit() {
    this.sortInfo$
      .pipe(
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll$)
      )
      .subscribe((sortInfo: any) => {
        if (sortInfo) {
          this.searchTerms['sort_field'] = sortInfo.field;
          this.searchTerms['sort_order'] = sortInfo.order;
          this.triggerSearch();
        }
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll$.next();
    this._unsubscribeAll$.complete();
  }

  onDataEvent(filter, searchEvent) {
    this.searchTerms[filter.field] = searchEvent.target.value;
    this.dataChanged.emit({ filter, searchEvent });
  }

  triggerSearch() {
    this.search.emit(this.searchTerms);
  }

  clearSearch() {
    this.searchTerms = {};
    this.filterClearNotifier.next(true);
    if (this.has_checkbox)
      this.clear.emit(this.searchTerms);
    this.triggerSearch();
  }

  get hasAdditionalFilters() {
    return (
      this.filtersConfig.additionalFilters &&
      this.filtersConfig.additionalFilters.length > 0
    );
  }

  toggleAdditionalFilters() {
    this.additionalFiltersShown = !this.additionalFiltersShown;
    this.additionalFiltersToggle.emit(this.additionalFiltersShown);
  }
}
