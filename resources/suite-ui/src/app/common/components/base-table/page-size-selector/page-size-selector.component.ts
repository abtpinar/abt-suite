import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-page-size-selector",
  templateUrl: "./page-size-selector.component.html",
  styleUrls: ["./page-size-selector.component.css"]
})
export class PageSizeSelectorComponent implements OnInit {
  @Input()
  pageSizes: number[];
  @Input()
  defaultPageSize: number;

  @Output()
  sizeChange = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {
    if (!this.pageSizes) this.pageSizes = [10, 25, 50, 100, 500, 1000];
  }

  changePageSize(size) {
    this.sizeChange.emit(+size);
  }
}
