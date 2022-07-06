import { NgxPermissionsService } from 'ngx-permissions';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FarmersSandbox } from '../../farmers.sandbox';
import { Observable, of, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FarmersService } from '../../services/farmers.service';
import { FarmerModel } from '../../models/farmer.model';
import { CodeTablesService } from 'src/app/common/services/code-tables.service';
import { ProductionUnitModel } from 'src/app/parameters/general/models/production-unit.model';

@Component({
  selector: 'app-farmers-item',
  templateUrl: './farmers-item.component.html',
  styleUrls: ['./farmers-item.component.sass']
})
export class FarmersItemComponent implements OnInit, OnDestroy {

  isLoading$: Observable<boolean>;
  farmer$: Observable<FarmerModel>;

  availableUnits$: Observable<ProductionUnitModel[]>;

  routeSubscription$: Subscription;
  farmerId: number;

  constructor(
    private sandbox: FarmersSandbox,
    private service: FarmersService,
    private route: ActivatedRoute,
    private permissionsService: NgxPermissionsService) { }

  ngOnInit() {
    this.farmer$ = this.sandbox.activeFarmer$;
    this.isLoading$ = this.sandbox.farmersLoading$;

    this.availableUnits$ = this.sandbox.availableUnits$;

    this.routeSubscription$ = this.route.params.subscribe(params => {
    //   this.farmerId = params['id'];

    //   if (params['id']) {
    //     this.sandbox.load(params['clientId']);
    //   } else if (params['cupsId']) {
    //     this.sandbox.loadInitialCups(params['cupsId']);
    //   } else if (params['comparativeFarmersId']) {
    //     this.loadComparativeFarmers(params['comparativeFarmersId']);
    //   }

    });
  }

  ngOnDestroy(): void {
    this.routeSubscription$.unsubscribe();
    this.sandbox.setActiveFarmer(null);
  }

  create(farmer: FarmerModel) {
    this.sandbox.addFarmer(farmer);
  }

  update(farmer: FarmerModel) {
    this.sandbox.updateFarmer(farmer);
  }

}
