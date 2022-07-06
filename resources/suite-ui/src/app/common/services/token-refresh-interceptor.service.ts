import { Injectable, Injector } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenRefreshInterceptorService {
  private auth: AuthService;

  constructor(private injector: Injector, private router: Router) {
    this.auth = this.injector.get(AuthService);
  }

  /**
   * Resets the headers upon a successfull token refresh
   * @param request The request to set the headers to
   */
  setHeaders(request: HttpRequest<any>) {
    return function(token: string) {
      return request.clone({
        setHeaders: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
    };
  }

  private excluded = [...environment.jwt_blacklistedRoutes];

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.requestExcluded(request)) {
      return next.handle(request);
    }

    return this.auth.token$.pipe(
      map(this.setHeaders(request)),
      mergeMap(req => next.handle(req)),

      catchError(error => {
        // Server sends 419 when token expires
        if (error.status === 419) {
          return this.auth.refreshToken().pipe(
            map(this.setHeaders(request)),
            mergeMap(req => next.handle(req))
          );
        }

        // Server sends 403 when token is blacklisted
        // or the refresh TTL has expired
        if (error.status === 403) {
          this.router.navigateByUrl('/lock-screen');
        }

        return throwError(error);
      })
    );
  }

  /**
   * Determines whether a request should be excluded from
   * the interception logic by examining the url and comparing
   * it to the blacklisted routes
   */
  requestExcluded(request: HttpRequest<any>) {
    const hasWildcard = this.excluded.indexOf('*') !== -1;
    if (hasWildcard) return true;

    const reqUrl = request.url;
    return !!this.excluded.find((url: string) => reqUrl.includes(url));
  }
}

export const TokenRefreshInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenRefreshInterceptorService,
  multi: true
};
