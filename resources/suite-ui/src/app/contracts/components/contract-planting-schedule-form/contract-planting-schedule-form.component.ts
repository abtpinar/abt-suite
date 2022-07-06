import { Component, OnInit, Input } from '@angular/core';
import { ComponentBase } from '../../../common/components/component-base';
import { ContractPlantingScheduleModel } from '../../models/contract-planting-schedule.model';
import { ContractPlantingScheduleComponent } from '../../containers';

/**
 * Component representing the Form where a Contact can be edited.
 */
@Component({
  selector: 'app-contract-planting-schedule-form',
  templateUrl: './contract-planting-schedule-form.component.html',
  styleUrls: ['./contract-planting-schedule-form.component.sass']
})
export class ContractPlantingScheduleFormComponent extends ComponentBase
  implements OnInit {
  private _items: ContractPlantingScheduleComponent;
  public itemClone: ContractPlantingScheduleModel = <ContractPlantingScheduleModel>{};
  public isSaving = false;
  public isEdit = false;

  public required: boolean;

  constructor() {
    super();
  }

  get item(): ContractPlantingScheduleModel {
    return this.itemClone;
  }

  set item(item: ContractPlantingScheduleModel) {
    this.itemClone = { ...item };
    this.isEdit = item.position !== -1;
  }

  get items(): ContractPlantingScheduleComponent {
    return this._items;
  }

  set items(itemList: ContractPlantingScheduleComponent) {
    this._items = itemList;
  }

  ngOnInit(): void {

  }

  finishEdition(isNew: boolean, item: ContractPlantingScheduleModel): void {
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
