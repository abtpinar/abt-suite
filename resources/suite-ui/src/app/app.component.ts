import { Component, OnInit } from '@angular/core';
import { LanguageService } from './i18n/services/language.service';

import { Dictionary as AuthEsDictionary } from './auth/i18n/es';
import { Dictionary as MainEsDictionary } from './main/i18n/es';
import { Dictionary as CommonEsDictionary } from './common/i18n/es';
import { Dictionary as FarmersEsDictionary } from './farmers/i18n/es';
import { Dictionary as ProductsEsDictionary } from './products/i18n/es';
import { Dictionary as ContractsEsDictionary } from './contracts/i18n/es';
import { Dictionary as EmployeesEsDictionary } from './employees/i18n/es';
import { Dictionary as CommunicationContractsEsDictionary } from './communication-contracts/i18n/es';
import { Dictionary as GeneralParametersEsDictionary } from './parameters/general/i18n/es';
import { Dictionary as CommunicationParametersEsDictionary } from './parameters/communications/i18n/es';
import { Dictionary as CoverParametersEsDictionary } from './parameters/cover/i18n/es';
import { Dictionary as CLsEsDictionary } from './cls/i18n/es';
import { Dictionary as FarmsDictionary } from './farms/i18n/es';

import { ComponentBase } from './common/components/component-base';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthService } from './auth/services/auth.service';
import { ThemeConfigServiceService } from './main/Services/theme-config-service.service';

/**
 * This is the root component of the whole application. It only initializes application wide aspects, and it presents in
 * its template a single router-outlet element, to provide application wide level routing.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent extends ComponentBase implements OnInit {

  constructor(
    private languageService: LanguageService,
    private permissionsService: NgxPermissionsService,
    private authService: AuthService,
    private themeConfigurationService: ThemeConfigServiceService
  ) {
    super();
  }

  public viewportWidth: any;

  /**
   * Initializes the language service dictionaries, bringing those from the application's modules.
   */
  ngOnInit(): void {
    this.themeConfigurationService.loadThemeConfig();
    this.initializeLanguageDictionary();
    this.viewportWidth = window.innerWidth;
    this.updateSidebarMode(this.viewportWidth);
    // fromEvent(window, 'resize')
    //   .pipe(
    //     debounceTime(100),
    //     map(e => e.currentTarget)
    //   )
    //   .subscribe((windowObj: any) =>
    //     this.updateSidebarMode(windowObj.innerWidth)
    //   );

    if (
      this.authService.userAuthenticated &&
      Object.keys(this.permissionsService.getPermissions()).length === 0
    ) {
      const user = this.authService.user;
      this.permissionsService.addPermission(user.roles.map(r => r.key));
    }
  }

  private updateSidebarMode(viewportWidth) {
    const body = document.getElementsByTagName('body')[0];
    if (viewportWidth > 767 && viewportWidth <= 1100) {
      body.classList.add('sidebar-collapse');
    } else {
      body.classList.remove('sidebar-collapse');
    }
  }

  private initializeLanguageDictionary(): void {
    this.dictionaries.forEach(dictionary =>
      this.languageService.merge(dictionary)
    );
  }

  get dictionaries() {
    return [
      CommonEsDictionary,
      AuthEsDictionary,
      MainEsDictionary,
      FarmersEsDictionary,
      ProductsEsDictionary,
      CLsEsDictionary,
      ContractsEsDictionary,
      EmployeesEsDictionary,
      CommunicationContractsEsDictionary,
      GeneralParametersEsDictionary,
      CommunicationParametersEsDictionary,
      CoverParametersEsDictionary,
      FarmsDictionary,
    ];
  }

}
