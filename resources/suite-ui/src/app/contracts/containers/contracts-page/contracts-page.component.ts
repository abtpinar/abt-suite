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
import {ContractModel} from '../../models/contract.model';
import {ContractsSandbox} from '../../contracts.sandbox';
import {ContractsConfigService} from '../../services/contracts-config.service';
import {BaseTableFilterFactoryService} from 'src/app/common/services/base-table-filter-factory.service';
import {CodeTablesService} from 'src/app/common/services/code-tables.service';
import {ContractsService} from '../../services/contracts.service';

/**
 * Component where there is possible to manage the data of the CUPs.
 */
@Component({
    selector: 'app-contracts-page',
    templateUrl: './contracts-page.component.html'
})
export class ContractsPageComponent implements OnInit, OnDestroy {

    entities$: Observable<ContractModel[]>;
    isLoading$: Observable<boolean>;
    paginationInfo$: Observable<ServerPaginationInfo>;
    searchTerms$;


    public excelConfiguration = this.service.getExportConfiguration(
        'application/vnd.ms-excel',
        'excel'
    );

    tableConfig: BaseTableConfiguration = {
        columns: this.configService.getListColumns(),
        searchConfig: this.configService.getListFilters(),
        useHeaderTemplate: true,
        rowActionButtons: [
            {
                tooltipI18nKey: 'contracts-page.list-btn.create-new-contract',
                icon: 'fe-briefcase',
                class: 'text-primary',
                callback: (contract: ContractModel) => this.goToCreateNewContract(contract),
                /*visibleFn: (contract: ContractModel) => false*/
            },
            {
                tooltipI18nKey: 'contracts-page.list-btn.download-pdf',
                icon: 'fe-download',
                class: 'text-primary',
                callback: (contract: ContractModel) => this.downloadPDF(contract),
                visibleFn: (contract: ContractModel) => contract.state === this.configService.contractStates.Activated
            },
            {
                tooltipI18nKey: 'contracts-page.list-btn.download-pdf',
                icon: 'fe-check',
                class: 'text-success',
                callback: (contract: ContractModel) => this.downloadPDF(contract),
                visibleFn: (contract: ContractModel) => contract.state === this.configService.contractStates.Accepted
            }
        ],
        actionButtons: [
            // {
            //   i18nKey: 'btn-add',
            //   icon: 'fe-plus',
            //   class: 'btn-primary mr-3',
            //   callback: (contract: ContractModel) => this.goTo(contract)
            // }
        ]
    };

    constructor(protected router: Router,
                protected languageService: LanguageService,
                protected notificationService: NotificationService,
                protected authService: AuthService,
                private sandbox: ContractsSandbox,
                private configService: ContractsConfigService,
                private filterFactory: BaseTableFilterFactoryService,
                private codeTablesService: CodeTablesService,
                private service: ContractsService) {
    }

    ngOnInit() {
        this.isLoading$ = this.sandbox.contractsLoading$;
        this.entities$ = this.sandbox.contracts$;
        this.paginationInfo$ = this.sandbox.contractsPaginationInfo$;
        this.searchTerms$ = this.sandbox.contractSearchTerms$;

        this.sandbox.loadContracts();

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
        this.sandbox.loadContracts();
    }

    loadPage(pageEvent) {
        this.sandbox.loadContracts(pageEvent);
    }

    private goTo(contract: ContractModel) {
        this.router.navigateByUrl(`contracts`);
    }

    private goToCreateNewContract(contract: ContractModel) {
        this.router.navigateByUrl(`/contracts/createFromFarmer/${contract.farmer.data.id}`);
    }

    goToEdit(contract: ContractModel) {
        this.sandbox.setActiveContract(contract);
        this.router.navigateByUrl(
            `/contracts/edit/${contract.farmer.data.id}/${contract.id}`
        );
    }

    downloadPDF(contract: ContractModel): void {
        this.isLoading$ = of(true);
        this.service.downloadPDF(contract.id).subscribe(
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

    downloadContractsValancePDF(): void {
        this.isLoading$ = of(true);
        this.service.downloadContractsValancePDF().subscribe(
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
