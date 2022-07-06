import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../common/services/navigation.service';
import { NotificationService } from '../../../common/services/notification.service';
import { LanguageService } from '../../../i18n/services/language.service';
import { AuthService } from '../../../auth/services/auth.service';
/**
 * A component to display messages to the user. The message may be of different meanings (error, notification, warning, information among
 * others).
 */
@Component({
    selector: 'app-reoad-dialog',
    templateUrl: './reload-dialog.component.html',
    styleUrls: ['./reload-dialog.component.sass']
})
export class ReloadDialogComponent implements OnInit {

     constructor(
       private navigationService: NavigationService,
       private notificationService: NotificationService,
       private languageService: LanguageService,
       private authService: AuthService,
     ) {}

     ngOnInit(): void {}

     reload() {
       this.authService.logout();
       window.location.reload(true);
     }

}
