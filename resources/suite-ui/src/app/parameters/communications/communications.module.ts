import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule as CustomCommonModule } from '../../common/common.module';
import { I18nModule } from '../../i18n/i18n.module';

// containers
import * as fromContainers from './containers';
// components
import * as fromComponents from './components';
// Store
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { effects, reducers } from './store';

export const ROUTES: Routes = [
  { path: '', component: fromContainers.CommunicationsPageComponent }
];

@NgModule({
  declarations: [...fromContainers.containers, ...fromComponents.components],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    CustomCommonModule,
    I18nModule,

    StoreModule.forFeature('communicationsFeatureState', reducers),
    EffectsModule.forFeature(effects)
  ]
})
export class CommunicationParametersModule { }
