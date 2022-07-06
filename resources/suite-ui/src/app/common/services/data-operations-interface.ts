import { Observable } from 'rxjs';
import { ServerResponse } from '../models/ServerResponse';
import { IApiResponse } from './responses';

export interface DataOperationsInterface {}

export interface Searchable<TEntity, TSearchCriteria>
  extends DataOperationsInterface {
  search(criteria?: TSearchCriteria): Observable<TEntity>;
}

export interface FullyRetrieveable<TEntity> extends DataOperationsInterface {
  items(): Observable<TEntity[]>;
}

export interface Retrieveable<TEntity, TId> extends DataOperationsInterface {
  getInstance(
    id: TId,
    pipeline
  ): Observable<IApiResponse | TEntity | ServerResponse<TEntity>>;
}

export interface Saveable<TEntity> extends DataOperationsInterface {
  createItem(data: TEntity, pipeline): Observable<TEntity>;
}

export interface Updatable<TEntity> extends DataOperationsInterface {
  updateItem(item: TEntity, pipeline): Observable<TEntity>;
}

export interface Deleteable<TEntity> extends DataOperationsInterface {
  deleteItem(item: TEntity, pipeline): Observable<TEntity>;
}
