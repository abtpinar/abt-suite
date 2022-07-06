import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {LanguageService} from '../../../i18n/services/language.service';
import {NotificationService} from '../../../common/services/notification.service';
import {concat, Observable, of, Subject} from 'rxjs';
import {ContractProductModel} from '../../models/contract-product.model';
import {ContractModel} from '../../models/contract.model';
import {ContractsSandbox} from '../../contracts.sandbox';
import {ContractsService} from '../../services/contracts.service';
import {ContractProductsService} from '../../services/contract-products.service';
import {DialogService} from 'src/app/common/services/dialog.service';
import {globalFormatDate} from 'src/app/common/components/formats';
import {TableCode} from 'src/app/common/models/table-code.model';
import {ContractProductFormComponent} from '../../components';

/**
 * A list to handle the client contacts.
 */
@Component({
    selector: 'app-contract-product',
    templateUrl: './contract-product.component.html',
    styleUrls: ['./contract-product.component.sass']
})
export class ContractProductComponent implements OnInit {
    public isLoading: boolean;
    public isEditing: boolean;
    public isReadOnly: boolean = true;
    public items: ContractProductModel[] = [];
    public itemsSubject = new Subject<ContractProductModel[]>();
    public itemsObservable: Observable<ContractProductModel[]>;


    @Input()
    public entity: ContractModel;

    @Input()
    availableProducts;

    private tobaccoType;
    public purchaseBudget = 0;

    @Input()
    public disabled = true;

    @Input()
    basic: boolean;

    private ton;

    @Input()
    edit: boolean;

    @ViewChild('editForm')
    private editForm: ContractProductFormComponent;

    formatDate = globalFormatDate;

    months = [
        {code: 8, name: this.languageService.translate('month.name.' + 8)},
        {code: 9, name: this.languageService.translate('month.name.' + 9)},
        {code: 10, name: this.languageService.translate('month.name.' + 10)},
        {code: 11, name: this.languageService.translate('month.name.' + 11)}
    ];

    constructor(private languageService: LanguageService,
                private dialogService: DialogService,
                private notificationService: NotificationService,
                private sandbox: ContractsSandbox,
                private entityService: ContractsService,
                private itemService: ContractProductsService) {
    }

    ngOnInit(): void {
        this.updateItemsList();
        this.isReadOnly = this.entity.contract_products.length > 0;
        this.entityService.tobaccoType$.subscribe(tobaccoType => {
            this.tobaccoType = tobaccoType;
            this.disabled = false;
            /*this.initPurchaseBudget();*/
        });

        this.entityService.ton$.subscribe(ton => {
            this.ton = ton;
            this.initPurchaseBudget();
        });

    }

    /**
     * Update contacts observable.
     */
    updateItemsList(): void {
        const schedules = <any>this.entity.contract_products;
        if (schedules.data) {
            this.entity.contract_products = schedules.data;
        }

        this.entity.contract_products.forEach((item, index) => {
            item.position = index;
        });

        this.items = this.entity.contract_products;
        this.itemsObservable = this.itemsSubject.asObservable();
        this.itemsSubject.next(this.items);
        this.itemsObservable = concat(of(this.items));
    }

    /**
     * Commands to start the edition of a new Contact.
     */
    newItem() {
        console.log('PB: ' + this.purchaseBudget, 'TP: ' + this.tobaccoType)
        if (this.purchaseBudget > 0) {
            this.selectItem(<ContractProductModel>{position: -1, product_id: null});
        } else {
            const msg = this.languageService.translate(
                'contract-product.new-form.purchase.budget'
            );
            this.notificationService.showError(msg);
        }
    }

    /**
     * Commands to start the edition of the given contact.
     *
     * @param contact: The contact to edit.
     */
    selectItem(item?: ContractProductModel): void {
        this.isEditing = true;
        this.editForm.items = this;
        this.editForm.item = item;
    }

    /**
     * Attempts to delete from the System the given Contact.
     *
     * @param item: The contact to delete.
     */
    deleteItem(item: ContractProductModel): void {
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
                        const index = this.entity.contract_products.indexOf(item);
                        this.entity.contract_products.splice(index, 1);
                        this.notificationService.showSuccess(this.languageService.translate('edit-client-list.contact-product-removed-correctly'));
                    },
                    () => this.notificationService.showError(this.languageService.translate('edit-client-form.error-removed-product'))
                );
            } else {
                const index = this.entity.contract_products.indexOf(item);
                this.entity.contract_products.splice(index, 1);
            }
        });
    }

    /**
     * Finishes the ongoing edition on a Contact and goes back to the Contact list.
     */
    finishEdition(isNew: boolean, item: ContractProductModel): void {
        item.basic = this.basic;
        if (this.purchaseBudget - (item.amount * item.price) > 0) {
            this.purchaseBudget -= (item.amount * item.price);
            console.log(this.purchaseBudget);
            if (this.entity && this.entity.id) {
                item.contract_id = this.entity.id;

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
                            this.entity.contract_products.push(response.data);
                        } else {
                            item['updated_at'] = {date: response.data.updated_at};
                            this.entity.contract_products[item.position] = item;
                        }

                        this.updateItemsList();

                        this.notificationService.showSuccess(this.languageService.translate('edit-contract-form.updated-product'));
                    },
                    () => this.notificationService.showError(this.languageService.translate('edit-client-form.error-updating-product'))
                );
            } else {

                if (isNew) {
                    this.entity.contract_products.push(item);
                } else {
                    this.entity.contract_products[item.position] = item;
                }

                this.updateItemsList();

            }

            this.isEditing = false;
        } else {
            const msg = this.languageService.translate(
                'contract-product-form.purchase.budget'
            );
            this.notificationService.showError(msg);
        }
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
                let value = {family: element.tobacco_family};
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

    getProduct(id: string, prop) {
        if (this.availableProducts) {
            const item = this.availableProducts.find(element => element.id == id);
            /*item = this.availableProductsSR.find(element => element.id == id);*/

            return item ? item[prop] : id;
        }
        return id;
    }

    initPurchaseBudget() {
        switch (this.tobaccoType) {
            case('TP'):
                this.purchaseBudget = 87487.44 * this.ton;
                break;
            case('V1'):
                this.purchaseBudget = 16586.34 * this.ton;
                break;
            case('V2'):
                this.purchaseBudget = 14496.75 * this.ton;
                break;
            case('SP'):
                this.purchaseBudget = 9407.11 * this.ton;
                break;
            case('BY'):
                this.purchaseBudget = 11117.89 * this.ton;
                break;
            case('VG'):
                this.purchaseBudget = 35592.73 * this.ton;
                break;
            default:
                this.purchaseBudget = 0;
                break;
        }
    }

}
