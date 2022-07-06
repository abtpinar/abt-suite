import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromRouter from '@ngrx/router-store';

import {
  Params,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

import * as fromUI from './ui.reducer';
import * as fromShared from './shared.reducer';

export interface AppState {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
  ui: fromUI.UIState;
  shared: fromShared.SharedState;
}

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export const reducers: ActionReducerMap<AppState> = {
  routerReducer: fromRouter.routerReducer,
  ui: fromUI.reducer,
  shared: fromShared.reducer
};

export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
>('routerReducer');

export const selectUIState = createFeatureSelector<fromUI.UIState>('ui');

export const selectSharedState = createFeatureSelector<fromShared.SharedState>(
  'shared'
);

// Router Serializer
export class CustomSerializer
  implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;
    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }
    const { params } = state;
    return { url, queryParams, params };
  }
}
