import { NgxPermissionsService } from 'ngx-permissions';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContractsSandbox } from '../../contracts.sandbox';
import { Observable, of, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TableCode } from 'src/app/common/models/table-code.model';
import { ContractsService } from '../../services/contracts.service';
import { ContractModel } from '../../models/contract.model';
import {FarmerModel} from '../../../farmers/models/farmer.model';
import { CodeTablesService } from 'src/app/common/services/code-tables.service';

@Component({
  selector: 'app-contracts-item',
  templateUrl: './contracts-item.component.html',
  styleUrls: ['./contracts-item.component.sass']
})
export class ContractsItemComponent implements OnInit, OnDestroy {

  isLoading$: Observable<boolean>;
  contract$: Observable<ContractModel>;
  farmer$: Observable<FarmerModel>;

  availableCodeTables$;

  availableTobaccoTapadoClasses$;
  availableTobaccoBurleyClasses$;

  availableProducts$;



 /* availableProductsSR$*/

  routeSubscription$: Subscription;
  contractId: number;

  constructor(
    private sandbox: ContractsSandbox,
    private service: ContractsService,
    private route: ActivatedRoute,
    private codeTablesService: CodeTablesService,
    private permissionsService: NgxPermissionsService) { }

  ngOnInit() {
    this.contract$ = this.sandbox.activeContract$;
    this.isLoading$ = this.sandbox.contractsLoading$;

    this.farmer$ = this.sandbox.contractFarmer$;
    this.availableTobaccoTapadoClasses$ = this.sandbox.availableTobaccoTapadoClasses$;
    this.availableTobaccoBurleyClasses$ = this.sandbox.availableTobaccoBurleyClasses$;
    this.availableProducts$ = this.sandbox.availableProducts$;
    /*this.availableProductsSR$ = this.sandbox.availableProductsSR$;*/

    this.availableCodeTables$ = this.codeTablesService.getCombinedTablesByKeys([
      this.codeTablesService.availableTableKeys.TobaccoFamilies,
      this.codeTablesService.availableTableKeys.PropertyTypes,
      this.codeTablesService.availableTableKeys.PlantingTypes,
      this.codeTablesService.availableTableKeys.TobaccoType,
    ]);


    this.routeSubscription$ = this.route.params.subscribe(params => {

      if (params['farmerId']) {
        this.sandbox.loadInitialFarmer(params['farmerId']);
      }
      if (params['contractId']) {
      } else {
        this.sandbox.setActiveContract(this.service.newEntity);
      }

    });
  }

  ngOnDestroy(): void {
    this.routeSubscription$.unsubscribe();
    this.sandbox.clearContractFarmer();
    this.sandbox.setActiveContract(null);
  }

  create(contract: ContractModel) {
    this.sandbox.addContract(contract);
  }

  update(contract: ContractModel) {
    this.sandbox.updateContract(contract);
  }

}
