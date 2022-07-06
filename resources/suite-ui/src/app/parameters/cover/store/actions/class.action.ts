import { Action } from '@ngrx/store';

import * as constants from '../constants/class.constant';
import { ClassModel } from '../../models/class.model';
import { PaginationInfo } from 'src/app/common/pagination';
import { ServerResponse } from 'src/app/common/models/ServerResponse';

export class LoadClasses implements Action {
  readonly type = constants.LOAD_CLASSES;
  constructor(public payload: PaginationInfo) {}
}

export class LoadClassesFail implements Action {
  readonly type = constants.LOAD_CLASSES_FAIL;
  constructor(public payload: any) {}
}

export class LoadClassesSuccess implements Action {
  readonly type = constants.LOAD_CLASSES_SUCCESS;
  constructor(public payload: ServerResponse<ClassModel>) {}
}

export class LoadClass implements Action {
  readonly type = constants.LOAD_CLASS;
  constructor(public payload: number) {}
}

export class LoadClassFail implements Action {
  readonly type = constants.LOAD_CLASS_FAIL;
  constructor(public payload: any) {}
}

export class LoadClassSuccess implements Action {
  readonly type = constants.LOAD_CLASS_SUCCESS;
  constructor(public payload: ClassModel) {}
}

// DELETE
export class DeleteClass implements Action {
  readonly type = constants.DELETE_CLASS;
  constructor(public payload: ClassModel) {}
}

export class DeleteClassFail implements Action {
  readonly type = constants.DELETE_CLASS_FAIL;
  constructor(public payload: any) {}
}

export class DeleteClassSuccess implements Action {
  readonly type = constants.DELETE_CLASS_SUCCESS;
  constructor(public payload: ClassModel) {}
}

export class AddClass implements Action {
  readonly type = constants.ADD_CLASS;
  constructor(public payload: ClassModel) {}
}

export class AddClassFail implements Action {
  readonly type = constants.ADD_CLASS_FAIL;
  constructor(public payload: any) {}
}

export class AddClassSuccess implements Action {
  readonly type = constants.ADD_CLASS_SUCCESS;
}

export class UpdateClass implements Action {
  readonly type = constants.UPDATE_CLASS;
  constructor(public payload: ClassModel) {}
}

export class UpdateClassFail implements Action {
  readonly type = constants.UPDATE_CLASS_FAIL;
  constructor(public payload: any) {}
}

export class UpdateClassSuccess implements Action {
  readonly type = constants.UPDATE_CLASS_SUCCESS;
  constructor(public payload: ClassModel) {}
}

export class SetActiveClass implements Action {
  readonly type = constants.SET_ACTIVE_CLASS;
  constructor(public payload: ClassModel) {}
}

// SEARCH
export class SetClassSearchTerms implements Action {
  readonly type = constants.SET_CLASS_SEARCH_TERMS;
  constructor(public payload: { [key: string]: any }) {}
}

export class ClearClassSearchTerms implements Action {
  readonly type = constants.CLEAR_CLASS_SEARCH_TERMS;
}

export type classActions =
  | LoadClasses
  | LoadClassesFail
  | LoadClassesSuccess
  | LoadClass
  | LoadClassFail
  | LoadClassSuccess
  | AddClass
  | AddClassFail
  | AddClassSuccess
  | UpdateClass
  | UpdateClassFail
  | UpdateClassSuccess
  | DeleteClass
  | DeleteClassFail
  | DeleteClassSuccess
  | SetActiveClass
  | SetClassSearchTerms
  | ClearClassSearchTerms;
