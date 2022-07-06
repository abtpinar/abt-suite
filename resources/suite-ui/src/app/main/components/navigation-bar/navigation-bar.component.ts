import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { NavigationService } from '../../../common/services/navigation.service';
import {NgxPermissionsService} from 'ngx-permissions';
import { environment } from '../../../../environments/environment';
import * as menu from '../main-side-bar/menu';

// To use jquery function in component
declare var $: any;

/**
 * Component representing the navigation bar that is displayed at the top of the app's header.
 */
@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.sass']
})
export class NavigationBarComponent implements OnInit {
  isAdmin = false;
  logoSrc = 'assets/images/logo.png';
  env = environment;

  menuItems: menu.SidenavMenuItem[] = menu.APP_MENU;
  activeMenuItems: menu.SidenavMenuItem[];

  constructor(public authService: AuthService,
    private navigationService: NavigationService,
    private permissionsService: NgxPermissionsService
  ) {

    // const permissions = this.permissionsService.getPermissions();
    // if ('ADMINISTRATOR' in permissions) {
    //   this.isAdmin = true;
    // }
    
  }

  ngOnInit(): void {
    this.activeMenuItems = this.menuItems;

    if (this.env.hideUnfinishedFeatures) {
      this.activeMenuItems = this.menuItems.filter(mi => !mi.hidden);
    }

    this.activeMenuItems = this.permsForChildren(this.activeMenuItems);

    $(document).ready(() => {
      'use strict';
      var Dropdowns = function () {
        var e = $('.dropup, .dropright, .dropdown, .dropleft'),
          t = $('.dropdown-menu'),
          o = $('.dropdown-menu');

        $('.dropdown-menu .dropdown-toggle').on('click', function () {
          var a;
          return (a = $(this)).closest(e).siblings(e).find(t).removeClass('show'), a.next(o).toggleClass('show'), !1;
        }),
          e.on('hide.bs.dropdown', function () {
            var a, e;
            a = $(this), (e = a.find(o)).length && e.removeClass('show'), $('.main-content').removeClass('opacity');
          }),
          $('.dropdown-toggle').on('click', function () {
            $('.main-content').addClass('opacity');
          });
      }();

    });
  }

  /**
   * Logs the user out and redirects it to the login page.
   */
  logout(): void {
    this.authService.logout().then(() => this.navigationService.goTo('/login'));
  }

  /**
   * Prevents the User profile drop down from closing.
   *
   * @param event: The click event to stop its propagation.
   */
  preventDropDownFromClosing(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
  }

  hasPerm(array: string[]) {
    const permissions = this.permissionsService.getPermissions();
    let result: boolean = false;
    array.forEach(item => {
      if (item in permissions) {
        result = true;
      }
    });
    return result;
  }

  permsForChildren(items: menu.SidenavMenuItem[]) {
    let menu: menu.SidenavMenuItem[] = [];
    for (let mi of items) {
      let menu_item = { ...mi, permissions: this.getMenuItemPermissions(mi) };
      if (mi.hasChildren) {
        menu_item = { ...menu_item, children: this.permsForChildren(mi.children) };
      }
      menu.push(menu_item);
    }
    return menu;
  }

  getMenuItemPermissions(item: menu.SidenavMenuItem): string[] {
    if (item.permissions) {
      if (!item.permissions.includes('ADMINISTRATOR')) {
        item.permissions.push('ADMINISTRATOR');
      }
      return item.permissions;
    } else {
      return ['ADMINISTRATOR'];
    }
  }
}
