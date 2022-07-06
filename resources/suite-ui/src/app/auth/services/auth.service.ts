import { Injectable } from '@angular/core';
import { AbstractApiBaseService } from '../../common/services/abstract-api-base.service';
import { HttpClient } from '@angular/common/http';
import { tap, map, finalize } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ILoginResponse } from '../../common/services/responses';
import { NavigationService } from '../../common/services/navigation.service';
import { IUser } from '../models/IUser';
import { NgxPermissionsService } from 'ngx-permissions';

/**
 * This service handles the status of a user session. Handles the authentication, registration and logging out of a
 * user.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService extends AbstractApiBaseService {
  private ACCESS_TOKEN = 'access_token';
  private USER_DATA = 'user_data';
  private refreshTokenCall;

  /**
   * Initializes a new instance of AuthService with required services.
   *
   * @param {HttpClient} http: A service to make requests to the backend.
   * @param {NavigationService} navigationService: Service to navigate to the different app's routes.
   */
  public constructor(
    http: HttpClient,
    navigationService: NavigationService,
    private permissionsService: NgxPermissionsService
  ) {
    super(http, navigationService);

    const userAsString = localStorage.getItem(this.USER_DATA);
    if (userAsString) {
      this._user = JSON.parse(userAsString);
    }
  }

  private _user: IUser;

  /**
   * Gets the authenticated user.
   * @returns {IUser} representing the information of the authenticated user (if any), undefined otherwise.
   */
  get user(): IUser {
    return this._user;
  }

  /**
   * Sets the authenticated user.
   *
   * @param {IUser} user: Represents the information of the authenticated user
   */
  set user(user: IUser) {
    this._user = user;
    // console.log('user::', user);
    const userAsString = JSON.stringify(user);
    localStorage.setItem(this.USER_DATA, userAsString);
    this.permissionsService.addPermission(user.roles.map(r => r.key));
    // console.log('perms', this.permissionsService.getPermissions());
  }

  /**
   * Gets the current access token.
   *
   * @returns {string} being the access token; or undefined if no token is stored.
   */
  get token(): string {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  /**
   * Saves the given access token as the current one.
   *
   * @param {string} accessToken: The new access token.
   */
  set token(accessToken: string) {
    localStorage.setItem(this.ACCESS_TOKEN, accessToken);
  }

  /**
   * Gets a value saying whether there is a user authenticated or not.
   *
   * @returns {boolean} true if the user is authenticated; false otherwise.
   */
  get userAuthenticated(): boolean {
    return !!this.user;
  }

  /**
   * This service targets no secure endpoint.
   */
  protected get isSecure(): boolean {
    return false;
  }

  /**
   * Logs a user in using the given credentials.
   *
   * @param {string} username: The username identifying the user to log in.
   * @param {string} password: The password to authenticate the user attempting to be logged in.
   * @returns {Promise<any>} which if it's fulfilled it would mean that the user was correctly authenticated by the
   * system, and that an authorization token was provided for upcoming protected requests made by such user can be
   * correctly authorized. If the promise is rejected, it means that the given credentials are not correct and the user
   * should try again with the right ones.
   */
  login(username: string, password: string): Observable<any> {
    const data = { username, password };

    return this.post('login/', data, true).pipe(
      tap<ILoginResponse>((responseObj: ILoginResponse) => {
        this.user = JSON.parse(responseObj.response.user) as IUser;
        this.token = responseObj.response.token;
      })
    );
  }

  /**
   * Registers a user using the given credentials.
   *
   * @param {string} email: The email which identifies the user.
   * @param {string} password: The password authenticate the user.
   * @param {string} firstName: User's first name.
   * @param {string} lastName: User's last name.
   * @returns {Promise<any>} // TODO Comment
   */
  register(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Observable<any> {
    const data = {
      email,
      password,
      first_name: firstName,
      last_name: lastName
    };

    return this.post('register/', data, true);
  }

  /**
   * Resets the token of the current user by re-authenticating her.
   *
   * @param {string} password: The password of the current user, to authenticate her.
   */
  reset(password: string): Observable<any> {
    const data = { username: this.user.email, password };

    return this.post('login/', data, true).pipe(
      tap(
        (responseObj: ILoginResponse) =>
          (this.token = responseObj.response.token)
      )
    );
  }

  /**
   * Logs the current user out.
   *
   * @returns {Promise<any>} when fulfill it would mean the user was successfully logged out; if rejected it means the
   * contrary case had happened.
   */
  logout(): Promise<any> {
    this.permissionsService.flushPermissions();
    // console.log('on logout', this.permissionsService.getPermissions());
    return new Promise(resolve => {
      localStorage.removeItem(this.ACCESS_TOKEN);
      localStorage.removeItem(this.USER_DATA);
      this.token = null;

      // Invalidate token on server
      this.get(`logout`);
      resolve();
    });
  }

  /**
   * Attempts to retrieve the token from Local Storage
   * and returns it as an Observable otherwise it calls refreshToken()
   * to get a new token from the refresh endpoint
   */
  get token$(): Observable<string> {
    if (localStorage.getItem(this.ACCESS_TOKEN)) {
      return of(this.token);
    }

    return this.refreshToken();
  }

  /**
   * Attempts to refresh a token calling the API's refresh endpoint.
   * If it succeeds it will save the new token in Local Storage to
   * be used in subsequent requests
   */
  refreshToken(): Observable<string> {
    if (!this.refreshTokenCall) {
      this.refreshTokenCall = this.get(`refresh`).pipe(
        map((response: any) => this.getTokenFromRefreshResponse(response)),
        tap(token => {
          this.token = token;
        }),
        finalize(() => (this.refreshTokenCall = null))
      );
    }
    return this.refreshTokenCall;
  }

  /**
   * Token property accesor method to adapt to different
   * login response body structures
   */
  private getTokenFromRefreshResponse(response): string {
    return response.response.token;
  }
}
