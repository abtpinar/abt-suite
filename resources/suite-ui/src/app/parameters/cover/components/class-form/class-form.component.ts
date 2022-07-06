import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {IEntity} from "src/app/common/models/IEntity";
import {TableCode} from "src/app/common/models/table-code.model";
import {CodeTablesService} from "src/app/common/services/code-tables.service";
import {parseNestedEntities} from "src/app/common/services/utils";
import {ClassModel} from "../../models/class.model";


@Component({
    selector: 'app-class-form',
    templateUrl: './class-form.component.html'
})
export class ClassFormComponent implements OnInit, OnChanges, OnDestroy {

    isEdit = false;
    form: FormGroup = this.toFormGroup();

    subscriptions$: Subscription[] = [];

    @Input()
    entity: ClassModel;

    @Input()
    availableClassesTypes: any[];

    @Input()
    availableTobaccoType: any;

    @Output()
    createEvent = new EventEmitter<ClassModel>();

    @Output()
    updateEvent = new EventEmitter<ClassModel>();

    @Output()
    cancelEvent = new EventEmitter();

    selectedType: TableCode;

    constructor(private formBuilder: FormBuilder,
                private codeTablesServices: CodeTablesService) {
    }

    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.entity) {
            if (!!this.entity.id) {
                this.isEdit = true;
                this.handleGroups(this.entity.type);
            }
            this.entity = parseNestedEntities(this.entity);
            this.form.patchValue(this.entity);
        }
    }

    get availableFilteredGroups() {
        if (this.selectedType && this.availableClassesTypes && this.availableClassesTypes.length > 0)
            return this.availableClassesTypes.find(item => item.code == this.selectedType).groups;
        return []
    }


    ngOnDestroy(): void {
        this.subscriptions$.forEach(sub$ => sub$.unsubscribe());
    }

    toFormGroup(): FormGroup {
        return this.formBuilder.group({
            name: [null, Validators.required],
            price: [null, Validators.required],
            type: [null, Validators.required],
            group: [null],
            tobacco_type:[null, Validators.required]
        });
    }

    prepareEntity(formValue) {
        const {
            name,
            price,
            type,
            group,
            tobacco_type
        } = formValue;

        let entity = {
            id: this.isEdit ? this.entity.id : null,
            name,
            price,
            type,
            group,
            tobacco_type
        };

        return entity;
    }

    onSave(form: FormGroup): void {
        const {valid} = form;

        if (valid) {
            const entity = this.prepareEntity(form.value);

            if (!this.isEdit) {
                this.createEvent.emit(entity);
            } else {
                this.updateEvent.emit(entity);
            }
        }
    }

    handleGroups(event) {
        this.selectedType = event;
        this.form.get('group').setValue(null);
    }

}
