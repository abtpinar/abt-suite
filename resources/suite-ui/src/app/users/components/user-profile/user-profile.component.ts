import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../auth/services/auth.service';
import {IUser} from '../../models/IUser';
import {UsersService} from '../../services/users.service';
import {NavigationService} from '../../../common/services/navigation.service';
import {LanguageService} from '../../../i18n/services/language.service';
import {NotificationService} from '../../../common/services/notification.service';
import {IApiResponse} from '../../../common/services/responses';
import {finalize, map} from 'rxjs/internal/operators';
import {ComponentBase} from '../../../common/components/component-base';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent extends ComponentBase implements OnInit {
  public isLoading: boolean;
  public userLoaded: boolean;
  public authUser: IUser;
  public user: IUser;
  credentials = {
    oldPassword: null,
    password: null,
    passwordConfirm: null
  };

  constructor(
    public authService: AuthService,
    private usersService: UsersService,
    private navigationService: NavigationService,
    private languageService: LanguageService,
    private notificationService: NotificationService
  ) {
    super();
  }

  ngOnInit(): void {
    // this.isLoading = true;
    this.userLoaded = false;
    this.getAuthUser();
  }

  /**
   * Get authenticated user data.
   */
  getAuthUser(): void {
    this.usersService
      .getUser(this.authService.user.id)
      .toPromise()
      .then((response: IApiResponse) => {
        this.authUser = response.response.data;
        // this.authUser.roles = response.response.data.roles.data;
        this.user = Object.assign({}, this.authUser);
        this.userLoaded = true;
        this.isLoading = false;
      },
        () => this.navigationService.goTo('/lock-screen'));
  }

  /**
   * Logs the user out and redirects it to the login page.
   */
  logout(): void {
    this.authService.logout().then(() => this.navigationService.goTo('/'));
  }

  /**
   * Logs the user out and redirects it to the login page.
   */
  lock(): void {
    this.authService.token = null;
    this.navigationService.goTo('/lock-screen');
  }

  /**
   * Handles the click to the User Image selector box. It pops up the File Open dialog of the browser where the client
   * can select the image for the user and load it into the browser.
   */
  showUserImageSelector(): void {
    const $fileChooser = this.$('<input type="file" class="d-none"/>');

    $fileChooser.change(changeEvent => {
      const file = changeEvent.currentTarget.files[0];
      const reader = new FileReader();
      reader.onload = () => (this.user.picture = reader.result);
      reader.readAsDataURL(file);
    });

    $fileChooser.click();
  }

  /**
   * Handles the submission of the User Profile form. Attempts to save a user with all the
   * data gathered in the form.
   *
   * @param {Event} event: The submit event raised from the form.
   */
  saveChanges(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    this.usersService
      .updateUserProfile(this.user)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        () => {
          const message = this.languageService.translate(
            'edit-user-dialog.edit-user-edited'
          );
          this.notificationService.showSuccess(message);
          this.authUser = Object.assign({}, this.user);
          this.authService.user = Object.assign({}, this.user);
        },
        error => {
          if (error.message !== undefined) {
            this.notificationService.showError(error.message);
          } else {
            const message = this.languageService.translate(
              'edit-user-dialog.error-editing-user'
            );
            this.notificationService.showError(message);
          }
        }
      );
  }

  updatePassword() {
    this.isLoading = true;
    this.usersService
      .updatePassword(this.credentials.oldPassword, this.credentials.password)
      .pipe(
        map(res => {
          this.authService.user = res.response.user;
          this.authService.token = res.response.token;
          return res;
        })
      )
      .subscribe(
        res => {
          this.isLoading = false;
          // this.credentials.oldPassword = null;
          // this.credentials.password = null;
          // this.credentials.passwordConfirm = null;

          this.notificationService.showSuccess(
            this.languageService.translate(
              'update-user-password.password-update-success'
            )
          );
        },
        res => {
          this.isLoading = false;
          if (
            res.status === 400 &&
            res.error.messages.includes('OLD_PASSWORD_INCORRECT')
          ) {
            this.notificationService.showError(
              this.languageService.translate(
                'update-user-password.old-password-incorrect'
              )
            );
          }
        }
      );
  }

}
