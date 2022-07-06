import {Component, OnInit, Input} from '@angular/core';
import {ComponentBase} from '../../../common/components/component-base';
import {ContractProductModel} from '../../models/contract-product.model';
import {ContractProductComponent} from '../../containers';

/**
 * Component representing the Form where a Contact can be edited.
 */
@Component({
    selector: 'app-contract-product-form',
    templateUrl: './contract-product-form.component.html',
    styleUrls: ['./contract-product-form.component.sass']
})
export class ContractProductFormComponent extends ComponentBase
    implements OnInit {
    private _items: ContractProductComponent;
    public itemClone: ContractProductModel = <ContractProductModel>{};
    public isSaving = false;
    public isEdit = false;

    public required: boolean;

    constructor() {
        super();
    }

    get item(): ContractProductModel {
        return this.itemClone;
    }

    set item(item: ContractProductModel) {
        this.itemClone = {...item};
        console.log('ic', this.itemClone);
        this.isEdit = item.position !== -1;
    }

    get items(): ContractProductComponent {
        return this._items;
    }

    set items(itemList: ContractProductComponent) {
        this._items = itemList;
    }

    get availableProducts() {
        return this.items.availableProducts;
    }

    /*get purchaseBudgett() {
      return this.items.purchaseBudget;
    }*/

    /*get availableProductsIN() {
     return this.items.availableProductsIN;
     }*/

    getProduct(productId, prop) {
        const product = this.items.availableProducts.find(item => item.id == productId);
        /* const productSR = this.items.availableProductsSR.find(item => item.id == productId);*/
        if (product)
            return product[prop];
        /*else if (productIN)
         return productIN[prop];*/
        return '';
    }

    ngOnInit(): void {

    }

    finishEdition(isNew: boolean, item: ContractProductModel): void {
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
        this.itemClone.price = this.getProduct(event, 'price');
    }
}
