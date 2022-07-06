import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { SidenavMenuItem, APP_MENU } from './menu';

// To use jquery function in component
declare var $: any;

/**
 * This is the component displaying and handling the logic for the Side bar that goes to the left of the UI (a.k.a the
 * Main Side bar). This is also the place where the root navigation controls should be placed.
 */
@Component({
  selector: 'app-main-side-bar',
  templateUrl: './main-side-bar.component.html',
  styleUrls: ['./main-side-bar.component.sass']
})
export class MainSideBarComponent implements OnInit {
  menuItems: SidenavMenuItem[] = APP_MENU;
  activeMenuItems: SidenavMenuItem[];
  env = environment;

  ngOnInit(): void {
    this.activeMenuItems = this.menuItems;

    if (this.env.hideUnfinishedFeatures) {
      this.activeMenuItems = this.menuItems.filter(mi => !mi.hidden);
    }

    this.activeMenuItems = this.permsForChildren(this.activeMenuItems);
  }

  permsForChildren(items: SidenavMenuItem[]) {
    let menu: SidenavMenuItem[] = [];
    for (let mi of items) {
      let menu_item = {...mi, permissions: this.getMenuItemPermissions(mi)};
      if (mi.hasChildren) {
        menu_item = {...menu_item, children: this.permsForChildren(mi.children)};
      }
      menu.push(menu_item);
    }
    return menu;
  }

  getMenuItemPermissions(item: SidenavMenuItem): string[] {
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
