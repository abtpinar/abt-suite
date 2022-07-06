import {Observable, of, Subscription} from 'rxjs';
import {Component, Injector, OnInit, Type, OnDestroy} from '@angular/core';
import {LanguageService} from '../../../i18n/services/language.service';
import {NotificationService} from '../../../common/services/notification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../auth/services/auth.service';
import {ServerPaginationInfo} from 'src/app/common/models/ServerPaginationInfo';
import {
    BaseTableConfiguration, FilterInput,
} from 'src/app/common/components/base-table/base-table-config';
import {FarmerModel} from '../../models/farmer.model';
import {FarmersSandbox} from '../../farmers.sandbox';
import {FarmersConfigService} from '../../services/farmers-config.service';
import {BaseTableFilterFactoryService} from 'src/app/common/services/base-table-filter-factory.service';
import {CodeTablesService} from 'src/app/common/services/code-tables.service';
import {forEach} from "@angular/router/src/utils/collection";
import {FarmersService} from "../../services/farmers.service";

/**
 * Component where there is possible to manage the data of the CUPs.
 */
@Component({
    selector: 'app-farmers-page',
    templateUrl: './farmers-page.component.html'
})
export class FarmersPageComponent implements OnInit, OnDestroy {

    entities$: Observable<FarmerModel[]>;
    isLoading$: Observable<boolean>;
    paginationInfo$: Observable<ServerPaginationInfo>;

    tableConfig: BaseTableConfiguration = {
        columns: this.configService.getListColumns(),
        searchConfig: this.configService.getListFilters(),
        useHeaderTemplate: true,
        rowActionButtons: [
            {
                tooltipI18nKey: 'farmers-page.list-btn.delete',
                icon: 'fe-trash',
                class: 'text-primary',
                callback: (farmer: FarmerModel) => this.sandbox.deleteFarmer(farmer),
                visibleFn: (farmer: FarmerModel) => farmer.contracts.data.length == 0
            },
            {
                tooltipI18nKey: 'farmers-page.list-btn.create-contract',
                icon: 'fe-briefcase',
                class: 'text-primary',
                callback: (farmer: FarmerModel) => this.goToCreateContract(farmer),
                visibleFn: (farmer: FarmerModel) => farmer.contracts.data.length == 0 && farmer.farms.data.length > 0 && this.validateStateUTT(farmer.farms.data)
            },
            {
                tooltipI18nKey: 'farmers-page.list-btn.download-contracts',
                icon: 'fe fe-book',
                class: 'text-primary',
                callback: (farmer: FarmerModel) => this.downloadPDF(farmer),
                visibleFn: (farmer: FarmerModel) => farmer.contracts.data.length > 0
            },
            {
                tooltipI18nKey: 'farmers-page.list-btn.create-farm',
                icon: 'fe fe-map',
                class: 'text-primary',
                callback: (farmer: FarmerModel) => this.goToCreateFarm(farmer),
                visibleFn: (farmer: FarmerModel) => farmer.farms.data.length == 0
            }
        ],
        actionButtons: [
            {
                i18nKey: 'btn-add',
                icon: 'fe-plus',
                class: 'btn-primary',
                callback: (farmer: FarmerModel) => this.goToAdd()
            },
            // {
            //   i18nKey: 'farmers-page.list-btn.download-template',
            //   icon: 'fe-download',
            //   class: 'btn-secondary ml-5',
            //   callback: (product: FarmerModel) => this.goTo(product)
            // },
            // {
            //   i18nKey: 'farmers-page.list-btn.upload-template',
            //   icon: 'fe-upload',
            //   class: 'btn-secondary ml-2',
            //   callback: (product: FarmerModel) => this.goTo(product)
            // }
        ]
    };

    constructor(protected router: Router,
                protected languageService: LanguageService,
                protected notificationService: NotificationService,
                protected authService: AuthService,
                private sandbox: FarmersSandbox,
                private configService: FarmersConfigService,
                private filterFactory: BaseTableFilterFactoryService,
                private codeTablesService: CodeTablesService,
                private service: FarmersService) {
    }

    ngOnInit() {
        this.isLoading$ = this.sandbox.farmersLoading$;
        this.entities$ = this.sandbox.farmers$;
        this.paginationInfo$ = this.sandbox.farmersPaginationInfo$;

        this.sandbox.loadFarmers();

        this.loadUnits();
    }

    ngOnDestroy(): void {
        this.sandbox.clearSearchTerms();
    }

    private filterDataLoaded(data: any[],
                             sub$: Subscription,
                             filterName: string,
                             disabled?) {
        this.tableConfig = this.filterFactory.updateFilterInTableConfig(
            data,
            this.tableConfig,
            filterName,
            false,
            'primary',
            'col-md-4',
            disabled
        );
    }

    loadUnits() {
        const sub$ = this.sandbox.availableUnits$
            .subscribe(response => {
                this.filterDataLoaded(response, sub$, 'unit', false);
            });
    }

    search(terms: any) {
        this.sandbox.search(terms);
        this.sandbox.loadFarmers();
    }

    loadPage(pageEvent) {
        this.sandbox.loadFarmers(pageEvent);
    }

    private goToAdd() {
        this.router.navigateByUrl(`farmers/new`);
    }

    goToEdit(farmer) {
        this.sandbox.setActiveFarmer(farmer);
        this.router.navigateByUrl(`farmers/edit/${farmer.id}`);
    }

    private goToCreateContract(farmer: FarmerModel) {
        this.router.navigateByUrl(`/contracts/createFromFarmer/${farmer.id}`);
    }

    private goToCreateFarm(farmer: FarmerModel) {
        this.router.navigateByUrl(`/farms/createFromFarmer/${farmer.id}`);
    }

    private validateStateUTT(farm) {
        /* console.log(farm);*/
        if (farm.length > 0) {
            var yearUTTexpiration = 0;
            var currentDate = new Date();
            var currentYear = currentDate.getFullYear();

            if (farm['expiration_date']) {
                yearUTTexpiration = farm['expiration_date'].split('-')[0];
                return currentYear < yearUTTexpiration;
            } else {
                for (const x of farm) {
                    yearUTTexpiration < x['expiration_date'].split('-')[0] ?
                        yearUTTexpiration = x['expiration_date'].split('-')[0] : yearUTTexpiration = yearUTTexpiration;
                }
                return currentYear < yearUTTexpiration;
            }
        } else {
            return false;
        }
    }

    downloadPDF(farmer: FarmerModel): void {
        this.isLoading$ = of(true);
        this.service.downloadPDF(farmer.id).subscribe(
            () => {
                this.isLoading$ = of(false);
            },
            error => {
                console.log(error);
                this.isLoading$ = of(false);
                const msg = this.languageService.translate(
                    'contracts-notifications.contract-template-download-error'
                );
                this.notificationService.showError(msg);
            }
        );
    }


}
