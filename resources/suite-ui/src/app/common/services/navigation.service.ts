import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

/**
 * A service to abstract the logic for navigation operations. When desired to navigate to certain URLs or site place in
 * general, this service should be injected and used.
 */
@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    constructor(private router: Router) {
    }


    /**
     * Navigates to the specified route.
     *
     * @param route: The name of of the route.
     * @param routeArgs: The arguments to construct the final route to navigate to.
     */
    goTo(route, ...routeArgs): void {
        this.router.navigate([route, ...routeArgs]);
    }

    /**
     * Navigates a URL defined by the given commands relatively to a specified route.
     *
     * @param route: The route to which the navigation will be relative to.
     * @param commands: The fragments conforming the relative route to navigate to.
     */
    goToRouteRelativeTo(route: ActivatedRoute, commands: any[]): void {
        this.router.navigate(commands, {relativeTo: route});
    }
}
