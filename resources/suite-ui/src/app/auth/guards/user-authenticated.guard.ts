import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {NavigationService} from '../../common/services/navigation.service';
import {AuthService} from '../services/auth.service';

/**
 * This is the guard which will determine whether a user is authenticated and whether Routes can be activated or not
 * according the previous condition.
 */
@Injectable({
    providedIn: 'root'
})
export class UserAuthenticatedGuard implements CanActivate {


    /**
     * Initializes a new instance of UserAuthenticatedGuard given required service.
     *
     * @param {NavigationService} navigationService: Service to navigate to different system locations.
     * @param {AuthService} authService: Service to handle the condition in which is the current user's session
     * (if any).
     */
    constructor(private navigationService: NavigationService, private authService: AuthService) {
    }


    /**
     * Determines whether there is User authenticated.
     *
     * @returns {boolean} true if for such user there is saved locally an access token; false otherwise.
     */
    get isUserLoggedIn(): boolean {
        return !!this.authService.token;
    }


    /**
     * Determines whether a specific route will be allowed to be activated or not, based on having or not a user
     * authenticated in the system. In case no user is authenticated, this method will navigate to the Login Route.
     *
     * @returns {Observable<boolean> | Promise<boolean> | boolean} A boolean value which is true when there is user
     * authenticated and the route can be activated in consequence; or false on the contrary case.
     */
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.isUserLoggedIn) {
            return true;
        }

        this.navigationService.goTo('/login');
        return false;
    }
}
