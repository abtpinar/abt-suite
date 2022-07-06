import { Component, OnInit, Input } from '@angular/core';
import { ComponentBase } from '../../../common/components/component-base';
import { ContractHarvestScheduleModel } from '../../models/contract-harvest-schedule.model';
import { ContractHarvestScheduleComponent } from '../../containers';

/**
 * Component representing the Form where a Contact can be edited.
 */
@Component({
  selector: 'app-contract-harvest-schedule-form',
  templateUrl: './contract-harvest-schedule-form.component.html',
  styleUrls: ['./contract-harvest-schedule-form.component.sass']
})
export class ContractHarvestScheduleFormComponent extends ComponentBase
  implements OnInit {
  private _items: ContractHarvestScheduleComponent;
  public itemClone: ContractHarvestScheduleModel = <ContractHarvestScheduleModel>{};
  public isSaving = false;
  public isEdit = false;

  public required: boolean;

  constructor() {
    super();
  }

  get item(): ContractHarvestScheduleModel {
    return this.itemClone;
  }

  set item(item: ContractHarvestScheduleModel) {
    this.itemClone = { ...item };
    this.isEdit = item.position !== -1;
  }

  get items(): ContractHarvestScheduleComponent {
    return this._items;
  }

  set items(itemList: ContractHarvestScheduleComponent) {
    this._items = itemList;
  }

  ngOnInit(): void {

  }

  finishEdition(isNew: boolean, item: ContractHarvestScheduleModel): void {
    this.items.finishEdition(isNew, item);
  }

  cancelEdition(): void {
    this.items.cancelEdition();
  }

  saveChanges(event: Event): void {
    event.preventDefault();

    if (this.isEdit) {
      this.updatedItem();
    } else {
      this.createdItem();
    }
  }

  private updatedItem() {
    this.finishEdition(false, this.itemClone);
  }

  private createdItem() {
    this.finishEdition(true, this.itemClone);
  }
}
