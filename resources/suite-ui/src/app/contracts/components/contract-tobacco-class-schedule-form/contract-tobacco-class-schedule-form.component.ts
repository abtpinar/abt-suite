import { Component, OnInit, Input } from '@angular/core';
import { ComponentBase } from '../../../common/components/component-base';
import { ContractTobaccoClassScheduleModel } from '../../models/contract-tobacco-class-schedule.model';
import { ContractTobaccoClassScheduleComponent } from '../../containers';

/**
 * Component representing the Form where a Contact can be edited.
 */
@Component({
  selector: 'app-contract-tobacco-class-schedule-form',
  templateUrl: './contract-tobacco-class-schedule-form.component.html',
  styleUrls: ['./contract-tobacco-class-schedule-form.component.sass']
})
export class ContractTobaccoClassScheduleFormComponent extends ComponentBase
  implements OnInit {
  private _items: ContractTobaccoClassScheduleComponent;
  public itemClone: ContractTobaccoClassScheduleModel = <ContractTobaccoClassScheduleModel>{};
  public isSaving = false;
  public isEdit = false;

  public required: boolean;

  constructor() {
    super();
  }

  get item(): ContractTobaccoClassScheduleModel {
    return this.itemClone;
  }

  set item(item: ContractTobaccoClassScheduleModel) {
    this.itemClone = { ...item };
    this.isEdit = item.position !== -1;
  }

  get items(): ContractTobaccoClassScheduleComponent {
    return this._items;
  }

  set items(itemList: ContractTobaccoClassScheduleComponent) {
    this._items = itemList;
  }

  ngOnInit(): void {

  }

  finishEdition(isNew: boolean, item: ContractTobaccoClassScheduleModel): void {
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

  handleProduct(event) {
    console.log(event);
    const item = this.items.availableTobaccoClasses.find(item => item.id == event);
    if (item)
      this.itemClone.price = item.price;
      
  }
}
