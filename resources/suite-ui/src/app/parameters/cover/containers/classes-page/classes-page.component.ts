import { Observable, Subscription } from 'rxjs';
import { Component, Injector, OnInit, Type, OnDestroy } from '@angular/core';
import { LanguageService } from '../../../../i18n/services/language.service';
import { NotificationService } from '../../../../common/services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../auth/services/auth.service';
import { ServerPaginationInfo } from 'src/app/common/models/ServerPaginationInfo';
import {
  BaseTableConfiguration, FilterInput,
} from 'src/app/common/components/base-table/base-table-config';
import {ClassModel} from '../../models/class.model';
import {ClassesSandbox} from '../../classes.sandbox';
import {ClassesConfigService} from '../../services/classes-config.service';
import { BaseTableFilterFactoryService } from 'src/app/common/services/base-table-filter-factory.service';
import { CodeTablesService } from 'src/app/common/services/code-tables.service';
import { ClassesService } from '../../services/classes.service';

/**
 * Component where there is possible to manage the data of the CUPs.
 */
@Component({
  selector: 'app-classes-page',
  templateUrl: './classes-page.component.html'
})
export class ClassesPageComponent implements OnInit, OnDestroy {

  entities$: Observable<ClassModel[]>;
  isLoading$: Observable<boolean>;
  paginationInfo$: Observable<ServerPaginationInfo>;

  tableConfig: BaseTableConfiguration = {
    columns: this.configService.getListColumns(),
    searchConfig: this.configService.getListFilters(),
    useHeaderTemplate: true,
    rowActionButtons: [
      {
        tooltipI18nKey: 'btn-edit',
        icon: 'fe-edit-2',
        class: 'text-primary',
        modalId: 'class-modal',
        callback: (tClass: ClassModel) => this.goToEdit(tClass),
        // visibleFn: (class: ClassModel) => class.contracts.data.length == 0
      }
    ],
    actionButtons: [
      {
        i18nKey: 'btn-add',
        icon: 'fe-plus',
        class: 'btn-primary',
        modalId: 'class-modal',
        callback: () => this.goToAdd()
      }
    ]
  };

  constructor(
    protected router: Router,
    protected languageService: LanguageService,
    protected notificationService: NotificationService,
    protected authService: AuthService,
    private sandbox: ClassesSandbox,
    private configService: ClassesConfigService,
    private service: ClassesService,
    private filterFactory: BaseTableFilterFactoryService,
    private codeTablesService: CodeTablesService
  ) {}

  ngOnInit() {
    this.isLoading$ = this.sandbox.classesLoading$;
    this.entities$ = this.sandbox.classes$;
    this.paginationInfo$ = this.sandbox.classesPaginationInfo$;

    this.sandbox.loadClasses();

    this.loadTobaccoClasses()
  }

  ngOnDestroy(): void {
    this.sandbox.clearSearchTerms();
  }
  
  private filterDataLoaded(
    data: any[],
    sub$: Subscription,
    filterName: string,
    disabled?
  ) {
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

  loadTobaccoClasses() {
    const sub$ = this.codeTablesService.getCodeTableByKey(this.codeTablesService.availableTableKeys.ClassesTypes)
      .subscribe(response => {
        let data = [];
        response.map(item => data.push({id: item.code, name: item.name}));
        this.filterDataLoaded(data, sub$, 'unit', false);
        this.tableConfig.columns = this.configService.getListColumns(response);
      });
  }

  search(terms: any) {
    this.sandbox.search(terms);
    this.sandbox.loadClasses();
  }

  loadPage(pageEvent) {
    this.sandbox.loadClasses(pageEvent);
  }

  private goToAdd() {
    this.sandbox.setActiveClass(this.service.newEntity);
    this.sandbox.showModal();
  }

  goToEdit(tClass) {
    this.sandbox.setActiveClass(tClass);
    this.sandbox.showModal();
  }

}
