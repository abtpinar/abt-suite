import { NgModule } from '@angular/core';
import { CommonModule as AngularCommon } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule } from '../i18n/i18n.module';
import { LoadingBoxComponent } from './components/loading-box/loading-box.component';
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';
import { EmailValidatorDirective } from './directives/validators/email-validator.directive';
import { DigitsValidatorDirective } from './directives/validators/digits-validator.directive';
import { NoSpacesDirective } from './directives/validators/no-spaces.directive';
import { NgxPermissionsModule } from 'ngx-permissions';

import { DynamicCheckboxColumnsSelectionDispatcherService } from './services/dynamic-checkbox-columns-selection-dispatcher.service';

import {CheckboxColumnComponent} from './components/checkbox-column/checkbox-column.component';
import {LinkColumnComponent} from './components/link-column/link-column.component';
import {LinkColumnHeaderComponent} from './components/link-column-header/link-column-header.component';
import {BaseColumnComponent} from './components/base-column/base-column.component';
import {BaseColumnHeaderComponent} from './components/base-column-header/base-column-header.component';
import {CheckboxColumnHeaderComponent} from './components/checkbox-column-header/checkbox-column-header.component';
import {BaseTableComponent} from './components/base-table/base-table.component';
import {TextFilterComponent} from './components/base-table/filters/text-filter/text-filter.component';
import {FilterInputComponent} from './components/base-table/filters/filter-input/filter-input.component';
import {SelectFilterComponent} from './components/base-table/filters/select-filter/select-filter.component';
import {CustomPaginatorComponent} from './components/base-table/custom-paginator/custom-paginator.component';
import {CustomSearchComponent} from './components/base-table/custom-search/custom-search.component';
import {DateFilterComponent} from './components/base-table/filters/date-filter/date-filter.component';
import {PageSizeSelectorComponent} from './components/base-table/page-size-selector/page-size-selector.component';
import {ExportExcelComponent} from './components/export-excel/export-excel.component';
import {FarmerSelectorFormControlComponent} from './components/farmer-selector-form-control/farmer-selector-form-control.component';
import {FarmerSelectionModalComponent} from './components/farmer-selection-modal/farmer-selection-modal.component';
import { EmployeeSelectionModalComponent } from './components/employee-selection-modal/employee-selection-modal.component';
import { EmployeeSelectorFormControlComponent } from './components/employee-selector-form-control/employee-selector-form-control.component';
import { SelectComponent } from './components/form-widgets/select/select.component';
import { CalendarComponent } from './components/form-widgets/calendar/calendar.component';
import { MaskComponent } from './components/form-widgets/mask/mask.component';
import { ModalComponent } from './components/modal/modal.component'


const directives = [
  EmailValidatorDirective,
  DigitsValidatorDirective,
  NoSpacesDirective
];

const components = [
  CheckboxColumnComponent,
  LinkColumnComponent,
  LinkColumnHeaderComponent,
  BaseColumnComponent,
  BaseColumnHeaderComponent,
  CheckboxColumnHeaderComponent,
  BaseTableComponent,
  TextFilterComponent,
  FilterInputComponent,
  SelectFilterComponent,
  DateFilterComponent,
  CustomPaginatorComponent,
  CustomSearchComponent,
  PageSizeSelectorComponent,
  ExportExcelComponent,
  FarmerSelectorFormControlComponent,
  FarmerSelectionModalComponent,
  EmployeeSelectionModalComponent,
  EmployeeSelectorFormControlComponent,
  SelectComponent,
  CalendarComponent,
  MaskComponent,
  ModalComponent,
];

@NgModule({
  declarations: [
    LoadingBoxComponent,
    MessageDialogComponent,
    ...directives,
    ...components
  ],
  imports: [
    AngularCommon,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    I18nModule,
    NgxPermissionsModule.forRoot(),
  ],
  exports: [
    LoadingBoxComponent,
    MessageDialogComponent,

    NgxPermissionsModule,
    ...directives,
    ...components
  ],
  entryComponents: [
    CheckboxColumnComponent,
    LinkColumnComponent,
    LinkColumnHeaderComponent,
    CheckboxColumnHeaderComponent,
  ],
  providers: [
    DynamicCheckboxColumnsSelectionDispatcherService
  ]
})
export class CommonModule { }
