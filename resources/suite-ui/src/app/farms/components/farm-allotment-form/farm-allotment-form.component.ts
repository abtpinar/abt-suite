import {Component, OnInit, Input} from '@angular/core';
import {ComponentBase} from '../../../common/components/component-base';
import {FarmAllotmentModel} from '../../models/farm-allotment.model';
import {FarmAllotmentComponent} from '../../containers';

/**
 * Component representing the Form where a Contact can be edited.
 */
@Component({
    selector: 'app-farm-allotment-form',
    templateUrl: './farm-allotment-form.component.html',
    styleUrls: ['./farm-allotment-form.component.sass']
})
export class FarmAllotmentFormComponent extends ComponentBase
    implements OnInit {
    private _items: FarmAllotmentComponent;
    public itemClone: FarmAllotmentModel = <FarmAllotmentModel>{};
    public isSaving = false;
    public isEdit = false;

    @Input()
    availableCodeTables: any;

    /*public required: boolean;*/

    constructor() {
        super();
    }

    get item(): FarmAllotmentModel {
        return this.itemClone;
    }

    set item(item: FarmAllotmentModel) {
        this.itemClone = {...item};
        console.log('ic', this.itemClone);
        this.isEdit = item.position !== -1;
    }

    get items(): FarmAllotmentComponent {
        return this._items;
    }

    set items(itemList: FarmAllotmentComponent) {
        this._items = itemList;
    }

    /*  get availableProducts() {
     return this.items.availableProducts;
     }*/

    /*getProduct(productId, prop) {
     const product = this.items.availableProducts.find(item => item.id == productId);
     if (product)
     return product[prop];
     return '';
     }*/

    ngOnInit(): void {
    }

    finishEdition(isNew: boolean, item: FarmAllotmentModel): void {
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

    /*handleProduct(event) {
     this.itemClone.price = this.getProduct(event, 'price');
     }*/

    getCodeTableItems(codeTableName: string) {
        if (this.availableCodeTables && this.availableCodeTables.combinedTableCodes && this.availableCodeTables.combinedTableCodes[codeTableName]) {
            return this.availableCodeTables.combinedTableCodes[codeTableName];
        }
        return [];
    }
}
