import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import { CommonModule as CustomCommonModule } from '../common/common.module';

import * as fromComponents from './components';

export const ROUTES: Routes = [
  {path: 'profile', component: fromComponents.UserProfileComponent}
];

@NgModule({
  declarations: [...fromComponents.components],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    CustomCommonModule,
  ]
})
export class UsersModule { }
