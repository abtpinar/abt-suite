import { Observable, of, Subscription } from 'rxjs';
import { Component, Injector, OnInit, Type, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { LanguageService } from '../../../i18n/services/language.service';
import { NotificationService } from '../../../common/services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { ServerPaginationInfo } from 'src/app/common/models/ServerPaginationInfo';
import {
  BaseTableConfiguration, FilterInput,
} from 'src/app/common/components/base-table/base-table-config';
import { ProductModel } from '../../models/product.model';
import { ProductsSandbox } from '../../products.sandbox';
import { ProductsConfigService } from '../../services/products-config.service';
import { BaseTableFilterFactoryService } from 'src/app/common/services/base-table-filter-factory.service';
import { CodeTablesService } from 'src/app/common/services/code-tables.service';
import { ContractModel } from '../../../contracts/models/contract.model';
import { ProductsService } from '../../services/products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Component where there is possible to manage the data of the CUPs.
 */
@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit, OnDestroy {

  @ViewChild('closebutton') closebutton;
  @ViewChild('inputFile') inputFile: ElementRef;

  entities$: Observable<ProductModel[]>;
  isLoading$: Observable<boolean>;
  paginationInfo$: Observable<ServerPaginationInfo>;
  formFile: FormGroup = this.toFormGroup();
  file: File;

  tableConfig: BaseTableConfiguration = {
    columns: this.configService.getListColumns(),
    searchConfig: this.configService.getListFilters(),
    useHeaderTemplate: true,
    // rowActionButtons: [
    //   {
    //     tooltipI18nKey: 'products-page.list-btn.create-contract',
    //     icon: 'fe-briefcase',
    //     class: 'text-primary',
    //     callback: (product: ProductModel) => this.goTo(product)
    //   }
    // ],
    actionButtons: [
      // {
      //   i18nKey: 'btn-add',
      //   icon: 'fe-plus',
      //   class: 'btn-primary',
      //   callback: (product: ProductModel) => this.goTo(product)
      // },
      {
        i18nKey: 'products-page.list-btn.download-template',
        icon: 'fe-download',
        class: 'btn-secondary ml-5',
        callback: () => this.downloadExcel()/*(product: ProductModel) => this.goTo(product)*/
      },
      /*{
        i18nKey: 'products-page.list-btn.upload-template',
        icon: 'fe-upload',
        class: 'btn-secondary ml-2',
        callback: (product: ProductModel) => this.goTo(product)
      }*/
    ]
  };

  constructor(
    protected router: Router,
    protected languageService: LanguageService,
    protected notificationService: NotificationService,
    protected authService: AuthService,
    private sandbox: ProductsSandbox,
    private configService: ProductsConfigService,
    private filterFactory: BaseTableFilterFactoryService,
    private codeTablesService: CodeTablesService,
    private service: ProductsService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.isLoading$ = this.sandbox.productsLoading$;
    this.entities$ = this.sandbox.products$;
    this.paginationInfo$ = this.sandbox.productsPaginationInfo$;

    this.sandbox.loadProducts();

    this.loadUnits();
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

  loadUnits() {
    const sub$ = this.codeTablesService.getCodeTableByKey(this.codeTablesService.availableTableKeys.Units)
      .subscribe(response => {
        const data = [];
        response.map(item => data.push({ id: item.code, name: item.name }));
        this.filterDataLoaded(data, sub$, 'unit', false);
        this.tableConfig.columns = this.configService.getListColumns(response);
      });
  }

  search(terms: any) {
    this.sandbox.search(terms);
    this.sandbox.loadProducts();
  }

  loadPage(pageEvent) {
    this.sandbox.loadProducts(pageEvent);
  }

  private goTo(product: ProductModel) {
    this.router.navigateByUrl(`products/excel`);
  }

  downloadExcel(): void {
    this.isLoading$ = of(true);
    this.service.downloadExcel().subscribe(
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

  onSelectFile(event): void {
    this.file = event.target.files[0];
    console.log(this.file);
  }

  toFormGroup(): FormGroup {
    return this.formBuilder.group({
      products: [null, Validators.required]
    });
  }

  onUploadFile(): void {
    this.isLoading$ = of(true);

    this.service.uploadFile(this.file).subscribe(
      () => {
        this.formFile.get('products').reset();
        this.closebutton.nativeElement.click();
        this.sandbox.loadProducts();
        this.isLoading$ = of(false);
        const msg = this.languageService.translate(
            'product-list.product-template-upload-success'
        );
        this.notificationService.showSuccess(msg);
      },
      error => {
        this.formFile.get('products').reset();
        this.closebutton.nativeElement.click();
        console.log(error);
        this.isLoading$ = of(false);
        const msg = this.languageService.translate(
          'product-list.product-template-download-error'
        );
        this.notificationService.showError(msg);
      }
    );
  }

  onCloseModal(): void {
    this.isLoading$ = of(true);
    this.formFile.get('products').reset();
    this.closebutton.nativeElement.click();
    this.isLoading$ = of(false);
  }
}
