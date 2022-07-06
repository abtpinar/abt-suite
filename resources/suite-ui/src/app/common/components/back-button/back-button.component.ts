import {Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../../@rootStore';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.sass']
})
export class BackButtonComponent {

  @Input()
  buttonClass: string;

  @Input()
  i18nText: string;

  constructor(private routeStore$: Store<fromRoot.RouterStateUrl>) {
    this.buttonClass = 'btn btn-light';
    this.i18nText = 'btn-cancel';
  }

  public backAction() {
    this.routeStore$.dispatch(new fromRoot.Back());
  }
}
