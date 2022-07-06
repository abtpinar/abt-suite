import { NgxPermissionsService } from 'ngx-permissions';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommunicationContractsSandbox } from '../../communication-contracts.sandbox';
import { Observable, of, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TableCode } from 'src/app/common/models/table-code.model';
import { CommunicationContractsService } from '../../services/communication-contracts.service';
import { CommunicationContractModel } from '../../models/communication-contract.model';
import {EmployeeModel} from '../../../employees/models/employee.model';
import { MobileModel } from 'src/app/parameters/communications/models/mobile.model';
import { SimModel } from 'src/app/parameters/communications/models/sim.model';

@Component({
  selector: 'app-contracts-item',
  templateUrl: './communication-contracts-item.component.html',
  styleUrls: ['./communication-contracts-item.component.sass']
})
export class CommunicationContractsItemComponent implements OnInit, OnDestroy {

  isLoading$: Observable<boolean>;
  contract$: Observable<CommunicationContractModel>;
  employee$: Observable<EmployeeModel>;

  availableUnits$: Observable<TableCode[]>;

  availableMobiles$: Observable<MobileModel[]>;
  availableSims$: Observable<SimModel[]>;

  routeSubscription$: Subscription;
  contractId: number;

  constructor(
    private sandbox: CommunicationContractsSandbox,
    private service: CommunicationContractsService,
    private route: ActivatedRoute,
    private permissionsService: NgxPermissionsService) { }

  ngOnInit() {
    this.contract$ = this.sandbox.activeCommunicationContract$;
    this.isLoading$ = this.sandbox.contractsLoading$;

    this.employee$ = this.sandbox.contractEmployee$;

    this.availableMobiles$ = this.sandbox.availableMobiles$;
    this.availableSims$ = this.sandbox.availableSims$;

    this.routeSubscription$ = this.route.params.subscribe(params => {

      if (params['employeeId']) {
        this.sandbox.loadInitialEmployee(params['employeeId']);
      }

    });
  }

  ngOnDestroy(): void {
    this.routeSubscription$.unsubscribe();
    this.sandbox.clearCommunicationContractEmployee();
    this.sandbox.setActiveCommunicationContract(null);
  }

  create(contract: CommunicationContractModel) {
    this.sandbox.addCommunicationContract(contract);
  }

  update(contract: CommunicationContractModel) {
    this.sandbox.updateCommunicationContract(contract);
  }

}
