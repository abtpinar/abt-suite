import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, pipe, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NavigationService } from './navigation.service';

/**
 * Base class of all the services in the current's app using the backend API.
 */
export class AbstractApiBaseService {
  /**
   * Initializes a new instance of AbstractApiBaseService with required services.
   *
   * @param {HttpClient} http: A service to make requests to the backend.
   * @param {NavigationService} navigationService: Service to navigate to the different app's routes.
   */
  constructor(
    protected http: HttpClient,
    private navigationService: NavigationService,
  ) {}

  private _apiUrl = environment.api;

  /**
   * Gets the URL being the root of this backend's API.
   *
   * @returns {string} the base URL of the backend's API.
   */
  protected get apiUrl(): string {
    return this._apiUrl;
  }

  /**
   * Gets the options to the send in the request as headers.
   *
   * @returns An object containing as key/value pairs all those values to be headers in the request to make.
   */
  protected get headers(): { [header: string]: string } {
    return { 'Content-Type': 'application/json', 'Build-Version': environment.buildVersion };
  }

  /**
   * Gets a value indicating whether the service should the requests it makes as ones directed to secure endpoints.
   * Therefore in the presence of response saying the request was unauthorized, this service should drop the response
   * altogether and navigate to the a route where the user can get authorized again.
   */
  protected get isSecure(): boolean {
    return true;
  }

  /**
   * This is the route to which to go when the user session has expired.
   */
  protected get reAuthorizingRoute(): string {
    return '/lock-screen';
  }

  /**
   * This is the route to which to go when the user session has expired.
   */
  protected get invalidBuildRoute(): string {
    return '/invalid-build';
  }

  /**
   * Performs a HTTP GET request to the given URL to a Web API yielding the collection of a type of objects (of T type).
   *
   * @param {string} url: The URL to issue the request to.
   * @param {boolean} isRelativeUrl: If true, it means that the URL is going to be appended to the current URL in the
   * browser, that is, it's a relative one; if false, it means that this value will be the whole URL, an absolute one.
   * @param {any[]} pipeline: An array of operators to apply to the resulting Observable of the request.
   * @returns {Observable<T[]>} which allows to monitor the result and status of the request once issued. Note tha the
   * observed value is an Array of type 'T'.
   */
  get<T>(url: string, isRelativeUrl: boolean = true): Observable<T[]> {
    const finalUrl = isRelativeUrl ? `${this.apiUrl}/${url}` : url;

    return this.http
      .get<T[]>(finalUrl, this.headers)
      .pipe(catchError(error => this.recoverError(error)));
  }

  basicGet<T>(url: string, isRelativeUrl: boolean = true, opts = {}): Observable<T> {
    const finalUrl = isRelativeUrl ? `${this.apiUrl}/${url}` : url;

    return this.http
      .get<T>(finalUrl, { ...opts, headers: { ...this.headers } })
      .pipe(catchError(error => this.recoverError(error)));
  }

  /**
   * Issues an HTTP PUT request to the given URL with given data and sets pipeline to process the incoming response.
   *
   * @param {string} url: The URL to issue the HTTP PUT request to.
   * @param {{}} data: An object containing the data to send.
   * @param {boolean} isRelativeUrl: If true it appends the url value to the API's base URI; if false it means that the
   * given URL is absolute and as such should be used.
   * @param {any[]} pipeline: An array of Observable operators to process the response's observable with.
   * @returns {Observable<T>} The processed observable that yield the response successful result or the error that
   * prevented it.
   */
  put<T>(url: string, data: {}, isRelativeUrl: boolean = true): Observable<T> {
    const finalUrl = isRelativeUrl ? `${this.apiUrl}/${url}` : url;

    return this.http
      .put<T>(finalUrl, data, this.headers)
      .pipe(catchError(error => this.recoverError(error)));
  }

  /**
   * Performs a HTTP DELETE request to the given URL to a Web API.
   *
   * @param {string} url: The URL to issue the request to.
   * @param {boolean} isRelativeUrl: If true, it means that the URL is going to be appended to the current URL in the
   * browser, that is, it's a relative one; if false, it means that this value will be the whole URL, an absolute one.
   * @param {any[]} pipeline: An array of operators to apply to the resulting Observable of the request.
   * @returns {Observable<T[]>} which allows to monitor the result and status of the request once issued. Note tha the
   * observed value is an Array of type 'T'.
   */
  delete(url: string, isRelativeUrl: boolean = true): Observable<any> {
    const finalUrl = isRelativeUrl ? `${this.apiUrl}/${url}` : url;

    return this.http
      .delete(finalUrl, this.headers)
      .pipe(catchError(error => this.recoverError(error)));
  }

  /**
   * Issues an HTTP POST request to the given URL with given data and sets pipeline to process the incoming response.
   *
   * @param {string} url: The URL to issue the HTTP POST request to.
   * @param {{}} data: An object containing the data to send.
   * @param {boolean} isRelativeUrl: If true it appends the url value to the API's base URI; if false it means that the
   * given URL is absolute and as such should be used.
   * @param {any[]} pipeline: An array of Observable operators to process the response's observable with.
   * @returns {Observable<T>} The processed observable that yield the response successful result or the error that
   * prevented it.
   */
  post<T>(url: string, data: {}, isRelativeUrl: boolean = true): Observable<T> {
    const finalUrl = isRelativeUrl ? `${this.apiUrl}/${url}` : url;

    return this.http
      .post<T>(finalUrl, data, this.headers)
      .pipe(catchError(error => this.recoverError(error)));
  }

  protected recoverError(error) {
    if (this.isSecure) {
      if (error.status == 522) {
        this.navigationService.goTo(this.invalidBuildRoute);
      }
      if (error.status === 401 || error.status === 403) {
        this.navigationService.goTo(this.reAuthorizingRoute);
      }
      return throwError(error);
    }
    return throwError(error);
  }
}
