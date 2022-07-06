import { NgxPermissionsService } from 'ngx-permissions';
import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { ClassesSandbox } from '../../../classes.sandbox';
import { Observable, of, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TableCode } from 'src/app/common/models/table-code.model';
import { ClassesService } from '../../../services/classes.service';
import { ClassModel } from '../../../models/class.model';
import { CodeTablesService } from 'src/app/common/services/code-tables.service';

// To use jquery function in component
declare var $: any;

@Component({
  selector: 'app-classes-modal',
  templateUrl: './classes-modal.component.html'
})
export class ClassesModalComponent implements OnInit, OnDestroy {

  isLoading$: Observable<boolean>;
  entity$: Observable<ClassModel>;

  availableClassesTypes$;

  availableTobaccoType$;

  modalIsOpen$: Observable<boolean>;

  constructor(
    private sandbox: ClassesSandbox,
    private codeTablesService: CodeTablesService) { }

  ngOnInit() {
    this.isLoading$ = this.sandbox.classesLoading$;
    this.entity$ = this.sandbox.activeClass$;
    this.modalIsOpen$ = this.sandbox.uiModalOpen$;

    this.availableClassesTypes$ = this.codeTablesService.getCodeTableByKey(this.codeTablesService.availableTableKeys.ClassesTypes);

    this.availableTobaccoType$ = this.codeTablesService.getCodeTableByKey(
      this.codeTablesService.availableTableKeys.TobaccoType,
    );
  }

  ngOnDestroy(): void {
    this.sandbox.setActiveClass(null);
  }

  create(tClass: ClassModel) {
    this.sandbox.addClass(tClass);
  }

  update(tClass: ClassModel) {
    this.sandbox.updateClass(tClass);
  }

  close() {
    this.sandbox.closeModal();
  }

}
