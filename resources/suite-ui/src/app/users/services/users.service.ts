import { Injectable } from '@angular/core';
import { AbstractCrudService } from '../../common/services/abstract-crud.service';
import { HttpClient } from '@angular/common/http';
import { NavigationService } from '../../common/services/navigation.service';
import { IUser } from '../models/IUser';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../common/services/responses';
import {EnableUser} from '../models/IEnableUser';
import {IActivateUser} from '../models/IActivateUser';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends AbstractCrudService<IUser> {

  constructor(
    http: HttpClient,
    navigationService: NavigationService
  ) {
    super(http, navigationService);
  }

  public get modelName(): string {
    return 'user';
  }

  /**
   * Gets a new user with default values.
   *
   * @returns {IUser} The new user with its fields to their defaults (where possible).
   */
  get newEntity(): IUser {
    return <IUser>{ active: false };
  }

  /**
   * Enable a user from his/her password change key.
   * @param enableUser User for enable.
   * @param pipeline
   * @returns {Observable<IUser>}
   */
  enableUserByPasswordChangeKey(
    enableUser: EnableUser
  ): Observable<IUser | IApiResponse> {
    return super.post(this.getModelUrl() + 'enable', enableUser, false);
  }

  /**
   * Activate an user.
   *
   * @param {IActivateUser} activateUser The user to activate.
   * @param pipeline An array of operators to apply to the resulting Observable of the request.
   * @returns {Observable<IUser>}
   */
  activateUser(activateUser: IActivateUser): Observable<IActivateUser> {
    return super.post(this.getModelUrl() + 'activate', activateUser, false);
  }

  /**
   * Desactivate an user.
   *
   * @param {IActivateUser} activateUser The user to desactivate.
   * @param pipeline An array of operators to apply to the resulting Observable of the request.
   * @returns {Observable<IUser>}
   */
  desactivateUser(desactivateUser: IActivateUser): Observable<IActivateUser> {
    return super.post(this.getModelUrl() + 'desactivate', desactivateUser, false);
  }

  /**
   * Get the user by id.
   * @param id
   * @param {any[]} pipeline
   * @returns {Observable<IApiResponse>}
   */
  getUser(id, pipeline = []): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(
      this.getSpecificModelUrl(id),
      this.headers
    );
  }

  /**
   * Update an user profile data.
   *
   * @param {IUser} item: The entity to persist its changes.
   * @param {any[]} pipeline: An array of operators to apply to the resulting Observable of the request.
   * @returns {Observable<IUser extends IEntity>} which eventually will yield the data of the updated entity
   * (maybe the backend changes something when processing the request, through this Observable those changes are
   * available).
   */
  updateUserProfile(item: IUser): Observable<IUser> {
    const url = `${this.getModelUrl()}profile/`;

    return super.put(url, item, false);
  }

  getUserUATEnv(): Observable<any> {
    const url = `${this.modelName}/getUATEnv`;

    return super.get(url);
  }

  getAll() {
    return this.basicGet<IApiResponse>(`${this.modelName}/getAll`);
  }

  updatePassword(oldPassword, newPassword, userId = null) {
    return this.put<IApiResponse>(`${this.modelName}/updatePassword`, {
      oldPassword,
      password: newPassword,
      userId
    });
  }

  getUserById(userId): Observable<any> {
    const url = `${this.modelName}/getUserById/${userId}`;

    return super.get(url);
  }
}
