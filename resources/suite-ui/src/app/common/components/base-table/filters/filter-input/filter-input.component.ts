import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterInput } from 'src/app/common/components/base-table/base-table-config';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-filter-input',
  templateUrl: './filter-input.component.html'
})
export class FilterInputComponent implements OnInit {
  @Input() public filterInput: FilterInput;
  @Input() clear: Observable<boolean>;

  @Output() public dataEvent: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
