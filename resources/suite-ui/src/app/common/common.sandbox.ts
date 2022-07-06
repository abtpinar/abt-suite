import { Injectable } from '@angular/core';
import { Sandbox } from '../common/base.sandbox';

import * as fromRoot from '../@rootStore';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class CommonSandbox extends Sandbox {
  constructor(rootStore$: Store<fromRoot.AppState>) {
    super(rootStore$);
  }
}
