import {Component, OnInit} from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-control-panel-page',
  templateUrl: './control-panel-page.component.html'
})
export class ControlPanelPageComponent implements OnInit {

  isAdmin = false;

  constructor(private permissionsService: NgxPermissionsService) { }

  ngOnInit() {
    const permissions = this.permissionsService.getPermissions();
    if ('ADMINISTRATOR' in permissions) {
      this.isAdmin = true;
    }
  }

}
