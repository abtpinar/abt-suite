import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { NavigationService } from '../../common/services/navigation.service';
import { AuthService } from '../services/auth.service';
import { NgxPermissionsService } from 'ngx-permissions';

/**
 * This is the guard which will determine whether a user is authenticated and whether Routes can be activated or not
 * according the previous condition.
 */
@Injectable({
  providedIn: 'root'
})
export class AdminAuthenticatedGuard implements CanActivate {
  /**
   * Initializes a new instance of AdminAuthenticatedGuard given required service.
   *
   * @param {NavigationService} navigationService: Service to navigate to different system locations.
   * @param {AuthService} authService: Service to handle the condition in which is the current user's session
   * (if any).
   */
  constructor(
    private navigationService: NavigationService,
    private authService: AuthService,
    private permissionsService: NgxPermissionsService
  ) {}

  /**
   * Determines if admin is  authenticated.
   *
   * @returns {boolean} true if if admin is  authenticated.
   */
  get isAdminAuthenticated(): boolean {
    const permissions = this.permissionsService.getPermissions();
    if ('SUPERADMIN' in permissions) {
      return true;
    }
    this.navigationService.goTo('/dashboard');
    return false;
  }

  /**
   * Determines whether a specific route will be allowed to be activated or not, based on having or not a user
   * authenticated in the system. In case no user is authenticated, this method will navigate to the Login Route.
   *
   * @returns {Observable<boolean> | Promise<boolean> | boolean} A boolean value which is true when there is user
   * authenticated and the route can be activated in consequence; or false on the contrary case.
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.isAdminAuthenticated) {
      return true;
    }
    return false;
  }
}
