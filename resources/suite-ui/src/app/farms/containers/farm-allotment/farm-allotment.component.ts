import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {LanguageService} from '../../../i18n/services/language.service';
import {NotificationService} from '../../../common/services/notification.service';
import {concat, Observable, of, Subject} from 'rxjs';
import {FarmAllotmentModel} from '../../models/farm-allotment.model';
import {FarmModel} from '../../models/farm.model';
import {FarmsSandbox} from '../../farms.sandbox';
import {FarmsService} from '../../services/farms.service';
/*import { ContractProductsService } from '../../services/contract-products.service';*/
import {DialogService} from 'src/app/common/services/dialog.service';
import {globalFormatDate} from 'src/app/common/components/formats';
import {TableCode} from 'src/app/common/models/table-code.model';
import {FarmAllotmentsService} from "../../services/farm-allotments.service";
import {FarmAllotmentFormComponent} from '../../components';
import {CodeTablesService} from "src/app/common/services/code-tables.service";


/**
 * A list to handle the client contacts.
 */
@Component({
    selector: 'app-farm-allotment',
    templateUrl: './farm-allotment.component.html',
    styleUrls: ['./farm-allotment.component.sass']
})
export class FarmAllotmentComponent implements OnInit {
    public isLoading: boolean;
    public isEditing: boolean;
    public isReadOnly: boolean = true;
    public items: FarmAllotmentModel[] = [];
    public itemsSubject = new Subject<FarmAllotmentModel[]>();
    public itemsObservable: Observable<FarmAllotmentModel[]>;

    @Input()
    public entity: FarmModel;

    @Input()
    availableCodeTables: TableCode[];

    /*@Input()
     basic: boolean;*/

    @ViewChild('editForm')
    private editForm: FarmAllotmentFormComponent;

    /*formatDate = globalFormatDate;

     months = [
     {code:8, name: this.languageService.translate('month.name.' + 8)},
     {code:9, name: this.languageService.translate('month.name.' + 9)},
     {code:10, name: this.languageService.translate('month.name.' + 10)},
     {code:11, name: this.languageService.translate('month.name.' + 11)}
     ];*/

    constructor(private languageService: LanguageService,
                private dialogService: DialogService,
                private notificationService: NotificationService,
                private sandbox: FarmsSandbox,
                private entityService: FarmsService,
                private itemService: FarmAllotmentsService,
                private codeTableService: CodeTablesService,) {
    }

    ngOnInit(): void {
        this.updateItemsList();
        this.isReadOnly = this.entity.allotments.length > 0;
        /*this.availableCodeTables$ = this.codeTableService.getCombinedTablesByKeys([
            this.codeTableService.availableTableKeys.UsageTypes,]);*/
    }

    /**
     * Update contacts observable.
     */
    updateItemsList(): void {
        const allotment = <any>this.entity.allotments;
        if (allotment.data) {
            this.entity.allotments = allotment.data;
        }

        this.entity.allotments.forEach((item, index) => {
            item.position = index;
        });

        this.items = this.entity.allotments;
        this.itemsObservable = this.itemsSubject.asObservable();
        this.itemsSubject.next(this.items);
        this.itemsObservable = concat(of(this.items));
    }

    /**
     * Commands to start the edition of a new Contact.
     */
    newItem() {
        this.selectItem(<FarmAllotmentModel> {id: null, position: -1});
        /*{ position: -1, id: null }*/
    }

    /**
     * Commands to start the edition of the given contact.
     *
     * @param contact: The contact to edit.
     */
    selectItem(item?: FarmAllotmentModel): void {
        this.isEditing = true;
        this.editForm.items = this;
        this.editForm.item = item;
    }

    /**
     * Attempts to delete from the System the given Contact.
     *
     * @param item: The contact to delete.
     */
    deleteItem(item: FarmAllotmentModel): void {
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
     const index = this.entity.allotments.indexOf(item);
     this.entity.allotments.splice(index, 1);
     this.notificationService.showSuccess(this.languageService.translate('edit-client-list.contact-removed-correctly'));
     },
     () => this.notificationService.showError(this.languageService.translate('edit-client-form.error-updating-client'))
     );
     } else {
     const index = this.entity.allotments.indexOf(item);
     this.entity.allotments.splice(index, 1);
     }
     });
     }

    /**
     * Finishes the ongoing edition on a Contact and goes back to the Contact list.
     */
    finishEdition(isNew: boolean, item: FarmAllotmentModel): void {
        /*item.basic = this.basic;*/
        if (this.entity && this.entity.id) {
            item.farm_id = this.entity.id;

            let action;
            if (isNew) {
                action = this.itemService.createItem({...item, return_entity: true});
            } else {
                delete item['updated_at'];
                action = this.itemService.updateItem({...item, return_entity: true});
            }

            action.subscribe(
                response => {

                    if (isNew) {
                        this.entity.allotments.push(response.data);
                    } else {
                        item['updated_at'] = {date: response.data.updated_at};
                        this.entity.allotments[item.position] = item;
                    }

                    this.updateItemsList();

                    this.notificationService.showSuccess(this.languageService.translate('edit-contract-form.updated-contract'));
                },
                () => this.notificationService.showError(this.languageService.translate('edit-client-form.error-updating-client'))
            );
        } else {

            if (isNew) {
                this.entity.allotments.push(item);
            } else {
                this.entity.allotments[item.position] = item;
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

    /*getView(data) {
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
     }*/

    /*getProduct(id: string, prop) {
     if (this.availableProducts) {
     const item = this.availableProducts.find(element => element.id == id);
     return item ? item[prop] : id;
     }
     return id;
     }*/

    getUsageType(id: string) {
        if (this.availableCodeTables) {
            const item = this.availableCodeTables.find(element => element.code == id);
            return item ? item.name : id;
        }
        return id;
    }

}
