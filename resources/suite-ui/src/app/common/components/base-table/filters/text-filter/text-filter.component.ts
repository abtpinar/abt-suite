import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
  OnDestroy
} from '@angular/core';
import { FilterInput } from 'src/app/common/components/base-table/base-table-config';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-text-filter',
  templateUrl: './text-filter.component.html'
})
export class TextFilterComponent implements OnInit, OnDestroy {
  filterValue: string = '';

  @Input() public filterInput: FilterInput;
  @Input() clear: Observable<boolean>;
  @Output() public dataEvent: EventEmitter<any> = new EventEmitter();

  clearFilterSubscription$: Subscription;

  constructor() {}

  ngOnInit() {
    if (this.clear) {
      this.clearFilterSubscription$ = this.clear.subscribe(() => {
        this.filterValue = '';
      });
    }
  }

  ngOnDestroy() {
    if (this.clearFilterSubscription$)
      this.clearFilterSubscription$.unsubscribe();
  }
}
