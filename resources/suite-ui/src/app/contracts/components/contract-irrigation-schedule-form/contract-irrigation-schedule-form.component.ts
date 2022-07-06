import { Component, OnInit, Input } from '@angular/core';
import { ComponentBase } from '../../../common/components/component-base';
import { ContractIrrigationScheduleModel } from '../../models/contract-irrigation-schedule.model';
import { ContractIrrigationScheduleComponent } from '../../containers';

/**
 * Component representing the Form where a Contact can be edited.
 */
@Component({
  selector: 'app-contract-irrigation-schedule-form',
  templateUrl: './contract-irrigation-schedule-form.component.html',
  styleUrls: ['./contract-irrigation-schedule-form.component.sass']
})
export class ContractIrrigationScheduleFormComponent extends ComponentBase
  implements OnInit {
  private _items: ContractIrrigationScheduleComponent;
  public itemClone: ContractIrrigationScheduleModel = <ContractIrrigationScheduleModel>{};
  public isSaving = false;
  public isEdit = false;

  public required: boolean;

  constructor() {
    super();
  }

  get item(): ContractIrrigationScheduleModel {
    return this.itemClone;
  }

  set item(item: ContractIrrigationScheduleModel) {
    this.itemClone = { ...item };
    this.isEdit = item.position !== -1;
  }

  get items(): ContractIrrigationScheduleComponent {
    return this._items;
  }

  set items(itemList: ContractIrrigationScheduleComponent) {
    this._items = itemList;
  }

  ngOnInit(): void {

  }

  finishEdition(isNew: boolean, item: ContractIrrigationScheduleModel): void {
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
