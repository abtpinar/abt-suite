import {Observable, of, Subscription} from 'rxjs';
import {Component, Injector, OnInit, Type, OnDestroy} from '@angular/core';
import {LanguageService} from '../../../i18n/services/language.service';
import {NotificationService} from '../../../common/services/notification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../auth/services/auth.service';
import {ServerPaginationInfo} from 'src/app/common/models/ServerPaginationInfo';
import {
    BaseTableConfiguration, FilterInput,
} from '../../../common/components/base-table/base-table-config';
import {FarmModel} from '../../models/farm.model';
import {BaseTableFilterFactoryService} from '../../../common/services/base-table-filter-factory.service';
import {CodeTablesService} from '../../../common/services/code-tables.service';
import {FarmsService} from '../../services/farms.service';
import {FarmsConfigService} from '../../services/farms-config.service';
import {FarmsSandbox} from '../../farms.sandbox';

/**
 * Component where there is possible to manage the data of the CUPs.
 */
@Component({
    selector: 'app-farms-page',
    templateUrl: './farms-page.component.html'
})
export class FarmsPageComponent implements OnInit, OnDestroy {

    entities$: Observable<FarmModel[]>;
    isLoading$: Observable<boolean>;
    paginationInfo$: Observable<ServerPaginationInfo>;

    tableConfig: BaseTableConfiguration = {
        columns: this.configService.getListColumns(),
        searchConfig: this.configService.getListFilters(),
        useHeaderTemplate: true,
        rowActionButtons: [
            {
             tooltipI18nKey: 'farms-page.list-btn.create-new-farm',
             icon: 'fe fe-map',
             class: 'text-primary',
             callback: (farm: FarmModel) => this.goToCreateNewFarm(farm),
             /*visibleFn: (contract: FarmModel) => false*/
             },
            /*{
             tooltipI18nKey: 'contracts-page.list-btn.download-pdf',
             icon: 'fe-download',
             class: 'text-primary',
             callback: (contract: FarmModel) => this.downloadPDF(contract),
             visibleFn: (contract: FarmModel) => contract.state == this.configService.contractStates.Activated
             },*/
            /*{
             tooltipI18nKey: 'contracts-page.list-btn.download-pdf',
             icon: 'fe-check',
             class: 'text-success',
             callback: (contract: FarmModel) => this.downloadPDF(contract),
             visibleFn: (contract: FarmModel) => contract.state == this.configService.contractStates.Accepted
             }*/
        ],
        /*actionButtons: [
         // {
         //   i18nKey: 'btn-add',
         //   icon: 'fe-plus',
         //   class: 'btn-primary mr-3',
         //   callback: (contract: ContractModel) => this.goTo(contract)
         // }
         ]*/
    };

    constructor(protected router: Router,
                protected languageService: LanguageService,
                protected notificationService: NotificationService,
                protected authService: AuthService,
                private sandbox: FarmsSandbox,
                private configService: FarmsConfigService,
                private filterFactory: BaseTableFilterFactoryService,
                private codeTablesService: CodeTablesService,
                private service: FarmsService) {
    }

    ngOnInit() {
        this.isLoading$ = this.sandbox.farmsLoading$;
        this.entities$ = this.sandbox.farms$;
        this.paginationInfo$ = this.sandbox.farmsPaginationInfo$;

        this.sandbox.loadFarms();

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
     this.sandbox.loadFarms();
     }

    loadPage(pageEvent) {
        this.sandbox.loadFarms(pageEvent);
    }

    /*private goTo(contract: FarmModel) {
     this.router.navigateByUrl(`contracts`);
     }*/

     goToEdit(farm) {
     this.sandbox.setActiveFarm(farm);
     this.router.navigateByUrl(
     `/farms/edit/${farm.farmer.data.id}/${farm.id}`
     );
     }

    goToCreateNewFarm(farm: FarmModel){
        this.router.navigateByUrl(`/farms/createFromFarmer/${farm.farmer.data.id}`);
    }

    /*downloadPDF(contract: FarmModel): void {
     this.isLoading$ = of(true);
     this.service.downloadPDF(contract.id).subscribe(
     () => {
     this.isLoading$ = of(false);
     },
     error => {
     console.log(error);
     this.isLoading$ = of(false);
     const msg = this.languageService.translate(
     'product-list.product-template-download-error'
     );
     this.notificationService.showError(msg);
     }
     );
     }
     */
}
