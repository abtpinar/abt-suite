import {NgxPermissionsService} from 'ngx-permissions';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FarmsSandbox} from '../../farms.sandbox';
import {Observable, of, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {TableCode} from '../../../common/models/table-code.model';
import {FarmsService} from '../../services/farms.service';
import {FarmModel} from '../../models/farm.model';
import {FarmerModel} from '../../../farmers/models/farmer.model';
import {CodeTablesService} from '../../../common/services/code-tables.service';

@Component({
    selector: 'app-farms-item',
    templateUrl: './farms-item.component.html',
    styleUrls: ['./farms-item.component.sass']
})
export class FarmsItemComponent implements OnInit, OnDestroy {

    isLoading$: Observable<boolean>;
    farm$: Observable<FarmModel>;
    farmer$: Observable<FarmerModel>;

    availableCodeTables$;

    routeSubscription$: Subscription;
    farmId: number;

    constructor(private sandbox: FarmsSandbox,
                private service: FarmsService,
                private route: ActivatedRoute,
                private codeTablesService: CodeTablesService,
                private permissionsService: NgxPermissionsService) {
    }

    ngOnInit() {
        this.farm$ = this.sandbox.activeFarm$;
        this.isLoading$ = this.sandbox.farmsLoading$;

        this.farmer$ = this.sandbox.farmFarmer$;

        /*this.availableTobaccoClasses$ = this.sandbox.availableTobaccoClasses$;

         this.availableProducts$ = this.sandbox.availableProducts$;*/

        this.availableCodeTables$ = this.codeTablesService.getCombinedTablesByKeys([
            this.codeTablesService.availableTableKeys.PossesionTypes,
            this.codeTablesService.availableTableKeys.GroundFeatures,
            this.codeTablesService.availableTableKeys.UsageTypes,
        ]);


        this.routeSubscription$ = this.route.params.subscribe(params => {

            if (params['farmerId']) {
                this.sandbox.loadInitialFarmer(params['farmerId']);
            }
            if (params['farmId']) {
            } else {
                this.sandbox.setActiveFarm(this.service.newEntity);
            }

        });
    }

    ngOnDestroy(): void {
        this.routeSubscription$.unsubscribe();
        this.sandbox.clearFarmFarmer();
        this.sandbox.setActiveFarm(null);
    }

    create(farm: FarmModel) {
        console.log(farm);
        this.sandbox.addFarm(farm);
    }

    update(farm: FarmModel) {
        this.sandbox.updateFarm(farm);
    }

}
