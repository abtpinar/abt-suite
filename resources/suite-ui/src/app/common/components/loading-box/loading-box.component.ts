import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';

/**
 * This is box that should be displayed on top of a portion of the UI that is busy doing some long operation.
 */
@Component({
  selector: 'app-loading-box',
  templateUrl: './loading-box.component.html',
  styleUrls: ['./loading-box.component.sass']
})
export class LoadingBoxComponent implements OnInit {
  @Input()
  public iconSize: string;
  @Input()
  public iconTopMargin: string;
  @Input()
  public iconForeground: string;

  @ViewChild('icon')
  private icon: ElementRef;

  /**
   * Initializes the state of the component. It modifies the style of the loading icon
   * so that it obbeys to the needs of the place in the app where it's being applied.
   */
  ngOnInit(): void {
    if (!!this.iconSize) {
      this.icon.nativeElement.style.fontSize = this.iconSize;
    }

    if (!!this.iconTopMargin) {
      this.icon.nativeElement.style.marginTop = this.iconTopMargin;
    }

    if (!!this.iconForeground) {
      this.icon.nativeElement.style.color = this.iconForeground;
    }
  }
}
