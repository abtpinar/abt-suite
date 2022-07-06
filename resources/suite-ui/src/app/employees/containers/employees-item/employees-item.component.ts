import { NgxPermissionsService } from 'ngx-permissions';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmployeesSandbox } from '../../employees.sandbox';
import { Observable, of, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TableCode } from 'src/app/common/models/table-code.model';
import { EmployeesService } from '../../services/employees.service';
import { EmployeeModel } from '../../models/employee.model';

@Component({
  selector: 'app-employees-item',
  templateUrl: './employees-item.component.html',
  styleUrls: ['./employees-item.component.sass']
})
export class EmployeesItemComponent implements OnInit, OnDestroy {

  isLoading$: Observable<boolean>;
  employee$: Observable<EmployeeModel>;

  availableUnits$: Observable<TableCode[]>;

  routeSubscription$: Subscription;
  employeeId: number;

  constructor(
    private sandbox: EmployeesSandbox,
    private service: EmployeesService,
    private route: ActivatedRoute,
    private permissionsService: NgxPermissionsService) { }

  ngOnInit() {
    this.employee$ = this.sandbox.activeEmployee$;
    this.isLoading$ = this.sandbox.employeesLoading$;

    // //this.availableCups$ = this.sandbox.availableCups$;

    this.routeSubscription$ = this.route.params.subscribe(params => {
    //   this.employeeId = params['id'];

    //   if (params['id']) {
    //     this.sandbox.load(params['clientId']);
    //   } else if (params['cupsId']) {
    //     this.sandbox.loadInitialCups(params['cupsId']);
    //   } else if (params['comparativeEmployeesId']) {
    //     this.loadComparativeEmployees(params['comparativeEmployeesId']);
    //   }

    });
  }

  ngOnDestroy(): void {
    this.routeSubscription$.unsubscribe();
    this.sandbox.setActiveEmployee(null);
  }

  create(employee: EmployeeModel) {
    this.sandbox.addEmployee(employee);
  }

  update(employee: EmployeeModel) {
    this.sandbox.updateEmployee(employee);
  }

}
