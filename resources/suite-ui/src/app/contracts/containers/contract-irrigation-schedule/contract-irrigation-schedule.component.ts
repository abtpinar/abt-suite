import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LanguageService } from '../../../i18n/services/language.service';
import { NotificationService } from '../../../common/services/notification.service';
import { concat, Observable, of, Subject } from 'rxjs';
import { ContractIrrigationScheduleModel } from '../../models/contract-irrigation-schedule.model';
import { ContractModel } from '../../models/contract.model';
import { ContractsSandbox } from '../../contracts.sandbox';
import { ContractsService } from '../../services/contracts.service';
import { ContractIrrigationSchedulesService } from '../../services/contract-irrigation-schedules.service';
import { DialogService } from 'src/app/common/services/dialog.service';
import { ContractIrrigationScheduleFormComponent } from '../../components/contract-irrigation-schedule-form/contract-irrigation-schedule-form.component';
import { globalFormatDate } from 'src/app/common/components/formats';
import { TableCode } from 'src/app/common/models/table-code.model';

/**
 * A list to handle the client contacts.
 */
@Component({
  selector: 'app-contract-irrigation-schedule',
  templateUrl: './contract-irrigation-schedule.component.html',
  styleUrls: ['./contract-irrigation-schedule.component.sass']
})
export class ContractIrrigationScheduleComponent implements OnInit {
  public isLoading: boolean;
  public isEditing: boolean;
  public isReadOnly: boolean = true;
  public items: ContractIrrigationScheduleModel[] = [];
  public itemsSubject = new Subject<ContractIrrigationScheduleModel[]>();
  public itemsObservable: Observable<ContractIrrigationScheduleModel[]>;

  @Input()
  public entity: ContractModel;

  @Input()
  availableTobaccoFamilies: TableCode[];

  @ViewChild('editForm')
  private editForm: ContractIrrigationScheduleFormComponent;

  formatDate = globalFormatDate;

  months = [
    {code:8, name: this.languageService.translate('month.name.' + 8)},
    {code:9, name: this.languageService.translate('month.name.' + 9)},
    {code:10, name: this.languageService.translate('month.name.' + 10)},
    {code:11, name: this.languageService.translate('month.name.' + 11)}
  ];

  constructor(
    private languageService: LanguageService,
    private dialogService: DialogService,
    private notificationService: NotificationService,
    private sandbox: ContractsSandbox,
    private entityService: ContractsService,
    private itemService: ContractIrrigationSchedulesService) {
  }

  ngOnInit(): void {
    this.updateItemsList();
    this.isReadOnly = this.entity.contract_irrigation_schedules.length > 0;
  }

  /**
   * Update contacts observable.
   */
  updateItemsList(): void {
    const schedules = <any>this.entity.contract_irrigation_schedules;
    if (schedules.data) {
      this.entity.contract_irrigation_schedules = schedules.data;
    }

    this.entity.contract_irrigation_schedules.forEach((item, index) => {
      item.position = index;
    });
    
    this.items = this.entity.contract_irrigation_schedules;
    this.itemsObservable = this.itemsSubject.asObservable();
    this.itemsSubject.next(this.items);
    this.itemsObservable = concat(of(this.items));
  }

  /**
   * Commands to start the edition of a new Contact.
   */
  newItem() {
    this.selectItem(<ContractIrrigationScheduleModel>{ position: -1 });
  }

  /**
   * Commands to start the edition of the given contact.
   *
   * @param contact: The contact to edit.
   */
  selectItem(item?: ContractIrrigationScheduleModel): void {
    this.isEditing = true;
    this.editForm.items = this;
    this.editForm.item = item;
  }

  /**
   * Attempts to delete from the System the given Contact.
   *
   * @param item: The contact to delete.
   */
  deleteItem(item: ContractIrrigationScheduleModel): void {
    this.dialogService.askUser(
      this.languageService.translate('edit-client.sure-to-delete-contact'),
      this.languageService.translate('edit-client.sure-to-delete-contact.title')
    ).subscribe(userAccepted => {
      if (!userAccepted) {
        return;
      }

      if (this.entity.id && item.id) {
        this.itemService.deleteItem(item).subscribe(
          () => {
            const index = this.entity.contract_irrigation_schedules.indexOf(item);
            this.entity.contract_irrigation_schedules.splice(index, 1);
            this.notificationService.showSuccess(this.languageService.translate('edit-client-list.contact-removed-correctly'));
          },
          () => this.notificationService.showError(this.languageService.translate('edit-client-form.error-updating-client'))
        );
      } else {
        const index = this.entity.contract_irrigation_schedules.indexOf(item);
        this.entity.contract_irrigation_schedules.splice(index, 1);
      }
    });
  }

  /**
   * Finishes the ongoing edition on a Contact and goes back to the Contact list.
   */
  finishEdition(isNew: boolean, item: ContractIrrigationScheduleModel): void {

    if (this.entity && this.entity.id) {
      item.contract_id = this.entity.id;

      let action;
      if (isNew) {
        action = this.itemService.createItem({ ...item, return_entity: true });
      } else {
        delete item['updated_at'];
        action = this.itemService.updateItem({ ...item, return_entity: true });
      }

      action.subscribe(
        response => {      

          if (isNew) {
            this.entity.contract_irrigation_schedules.push(response.data);
          } else {
            item['updated_at'] = { date: response.data.updated_at };
            this.entity.contract_irrigation_schedules[item.position] = item;
          }

          this.updateItemsList();

          this.notificationService.showSuccess(this.languageService.translate('edit-contract-form.updated-contract'));
        },
        () => this.notificationService.showError(this.languageService.translate('edit-client-form.error-updating-client'))
      );
    } else {
      
      if (isNew) {
        this.entity.contract_irrigation_schedules.push(item);
      } else {
        this.entity.contract_irrigation_schedules[item.position] = item;
      }

      this.updateItemsList();

    }

    this.isEditing = false;
  }

  /**
   * Cancel the ongoing edition and goes back to the Contact list.
   */
  cancelEdition(): void {
    this.isEditing = false;
  }

  getView(data) {
    let items = [];
    let families = [];
    data.forEach(element => {
      if (!families.includes(element.tobacco_family)) {
        families.push(element.tobacco_family);
        let value = { family: element.tobacco_family };
        data.forEach(item => {
          if (item.tobacco_family == element.tobacco_family) {    
            if (item.month == 8) {
              value['amount_p1'] = item.amount_p1;
              value['amount_p2'] = item.amount_p2;
              value['amount_p3'] = item.amount_p3;
            }    
            if (item.month == 9) {
              value['amount_p4'] = item.amount_p1;
              value['amount_p5'] = item.amount_p2;
              value['amount_p6'] = item.amount_p3;
            }    
            if (item.month == 10) {
              value['amount_p7'] = item.amount_p1;
              value['amount_p8'] = item.amount_p2;
              value['amount_p9'] = item.amount_p3;
            }     
            if (item.month == 11) {
              value['amount_p10'] = item.amount_p1;
              value['amount_p11'] = item.amount_p2;
              value['amount_p12'] = item.amount_p3;
            }            
          }
        });
        items.push(value);
      }
    });
    return items;
  }

  getTobaccoFamilyName(id: string) {
    if (this.availableTobaccoFamilies) {
      const item = this.availableTobaccoFamilies.find(element => element.code == id);
      return item ? item.name : id;
    }
    return id;
  }

}
