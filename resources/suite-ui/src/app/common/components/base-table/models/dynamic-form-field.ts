import {ValidatorFn} from '@angular/forms';

export abstract class DynamicFormField {
    public name: string;
    public modelPath?: string;
    public textI18nKey?: string;
    public columnWidth: number;
    public isDisabled?: (data: any) => boolean;
    public isVisible?: (data: any) => boolean;
    public isRequired?: boolean;
    public maxLength?: number;
    public validators?: ValidatorFn[];

    constructor(obj) {
        this.name = obj.name;
        this.modelPath = obj.modelPath;
        this.textI18nKey = obj.textI18nKey;
        this.columnWidth = obj.columnWidth;
        this.isDisabled = obj.isDisabled;
        this.isVisible = obj.isVisible;
        this.isRequired = obj.isRequired;
        this.validators = obj.validators;
    }
}
