import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';

import { reducers, effects, CustomSerializer } from './index';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../../environments/environment';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? []
  : [];

@NgModule({
  imports: [
    StoreModule.forRoot(reducers),

    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ]
})
export class AppRootStoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: AppRootStoreModule
  ) {
    if (parentModule) {
      throw new Error(
        'AppRootStoreModule is already loaded. Import only in AppModule'
      );
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppRootStoreModule,

      providers: [
        { provide: RouterStateSerializer, useClass: CustomSerializer }
      ]
    };
  }
}
