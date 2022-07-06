import {Action} from '@ngrx/store';

// SHOW LOADER
export const SHOW_LOADER = '[UI] Show Loader';

// HIDE LOADER
export const HIDE_LOADER = '[UI] Hide Loader';

export class ShowLoader implements Action {
  readonly type = SHOW_LOADER;
}

export class HideLoader implements Action {
  readonly type = HIDE_LOADER;
}

// Modal
export const OPEN_MODAL = '[UI] Open Modal';
export const CLOSE_MODAL = '[UI] Close Modal';

export class OpenModal implements Action {
  readonly type = OPEN_MODAL;
}

export class CloseModal implements Action {
  readonly type = CLOSE_MODAL;
}

export type UIActions = ShowLoader | HideLoader | OpenModal | CloseModal;
