import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {NotificationService} from '../../../common/services/notification.service';
import {LanguageService} from '../../../i18n/services/language.service';
import {environment} from '../../../../environments/environment';

/**
 * Component to authenticate a user in. This is the login page showing the Login Form to gather the user credentials.
 */
@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.sass']
})
export class LoginPageComponent {
    public email: string;
    public password: string;
    public isLoggingIn: boolean;
    public logoSrc = 'assets/images/logo2.png';

    constructor(private authService: AuthService, private notificationService: NotificationService,
                private languageService: LanguageService, private router: Router) {
      this.authService.logout();

    //   if (environment.themeConfiguration) {
    //     this.logoSrc = environment.themeConfiguration.logo;
    //   }
    }

    /**
     * Handles the submit event of the Login form, by attempting to log a given user in.
     *
     * @param event: The submit event.
     */
    login(event: Event): void {
        event.preventDefault();

        this.isLoggingIn = true;

        this.authService.login(this.email, this.password)
            .subscribe(
                (response: any) => {
                    this.router.navigate(['/']);
                },
                error => {
                    this.isLoggingIn = false;
                    const message = error.status === 401
                        ? 'login-form.invalid-email-or-password'
                        : 'login-form.authentication-error';

                    this.notificationService.showError(this.languageService.translate(message));
                }
            );
    }
}
