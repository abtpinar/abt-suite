import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthModule} from '../auth/auth.module';
import {I18nModule} from '../i18n/i18n.module';
import {CommonModule as CustomCommonModule} from '../common/common.module';
import * as fromComponents from './components';
import { NgxPermissionsModule } from 'ngx-permissions';

export const ROUTES: Routes = [{ path: '', component: fromComponents.MainPageComponent }];

/**
 * This is the main module of the application. It is intended to include the components, services and logic that is not
 * strictly related to a business context of the application. The logic here is related to the application itself, not
 * the business rules it handles.
 */
@NgModule({
  imports: [
    CommonModule,
    AuthModule,
    RouterModule,
    I18nModule,
    CustomCommonModule,
    NgxPermissionsModule.forRoot(),
  ],
  declarations: [...fromComponents.components],
  exports: [...fromComponents.components, 
    NgxPermissionsModule]
})
export class MainModule {}
