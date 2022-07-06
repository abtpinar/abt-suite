import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModule as CustomCommonModule } from '../common/common.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RouterModule, Routes } from '@angular/router';
import { I18nModule } from '../i18n/i18n.module';
import { LockScreenPageComponent } from './components/lock-screen-page/lock-screen-page.component';
import { ReloadDialogComponent } from './components/reload-dialog/reload-dialog.component';

export const ROUTES: Routes = [
  { path: 'login', component: LoginPageComponent }
];

/**
 * The module representing all the logic for user access control to the system.
 */
@NgModule({
  imports: [
    CommonModule,
    CustomCommonModule,
    FormsModule,
    ReactiveFormsModule,

    BrowserAnimationsModule,
    RouterModule,
    I18nModule
  ],
  declarations: [LoginPageComponent, LockScreenPageComponent, ReloadDialogComponent],
  exports: [LoginPageComponent, LockScreenPageComponent, ReloadDialogComponent]
})
export class AuthModule {}
