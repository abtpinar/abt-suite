import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as actionConstants from '../constants/class.constant';
import * as actionCreators from '../actions/class.action';
import { ClassModel } from '../../models/class.model';
import { ServerPaginationInfo } from 'src/app/common/models/ServerPaginationInfo';

export interface State extends EntityState<ClassModel> {
  loaded: boolean;
  loading: boolean;
  error: any;
  paginationInfo: ServerPaginationInfo;
  searchTerms: any;
  activeClass: ClassModel;
}

export const adapter: EntityAdapter<ClassModel> = createEntityAdapter<ClassModel>();

export const initialState: State = adapter.getInitialState({
  loaded: false,
  loading: false,
  error: null,
  paginationInfo: {},
  searchTerms: null,
  activeClass: null,
});

export function reducer(
  state = initialState,
  action: actionCreators.classActions
) {
  switch (action.type) {
    
    case actionConstants.ADD_CLASS:
    case actionConstants.UPDATE_CLASS:
    case actionConstants.DELETE_CLASS:
    case actionConstants.LOAD_CLASS:
    case actionConstants.LOAD_CLASSES: {
      return { ...state, loading: true };
    }

    case actionConstants.ADD_CLASS_FAIL:
    case actionConstants.UPDATE_CLASS_FAIL:
    case actionConstants.DELETE_CLASS_FAIL:
    case actionConstants.LOAD_CLASS_FAIL:
    case actionConstants.LOAD_CLASSES_FAIL: {
      const error = action.payload;
      return { ...state, error, loading: false };
    }

    case actionConstants.LOAD_CLASSES_SUCCESS: {
      const serverResponse = action.payload;
      const { data, meta } = serverResponse.response;
      const { pagination: paginationInfo } = meta;
      return adapter.addAll(data, {
        ...state,
        loaded: true,
        loading: false,
        paginationInfo
      });
    }

    case actionConstants.DELETE_CLASS_SUCCESS: {
      const deletedItem = action.payload;
      return adapter.removeOne(deletedItem.id, { ...state, loading: false });
    }

    case actionConstants.UPDATE_CLASS_SUCCESS: {
      const updatedItem = action.payload;
      return adapter.updateOne(
        {
          id: updatedItem.id,
          changes: { ...updatedItem }
        },
        { ...state, loading: false }
      );
    }

    case actionConstants.SET_ACTIVE_CLASS: {
      const activeClass = action.payload;
      return { ...state, activeClass };
    }

    case actionConstants.SET_CLASS_SEARCH_TERMS: {
      const searchTerms = action.payload;
      return { ...state, searchTerms };
    }

    case actionConstants.CLEAR_CLASS_SEARCH_TERMS: {
      return { ...state, searchTerms: null };
    }

    default: {
      return state;
    }
  }
}

export const selectClassesLoaded = (state: State) => state.loaded;
export const selectClassesLoading = (state: State) => state.loading;
export const selectClassesPaginationInfo = (state: State) => state.paginationInfo;
export const selectClassesSearchTerms = (state: State) => state.searchTerms;
export const selectActiveClass = (state: State) => state.activeClass;

export const {
  selectIds: selectClassIds,
  selectEntities: selectClassEntities,
  selectAll: selectAllClasses,
  selectTotal: selectClassTotal
} = adapter.getSelectors();
