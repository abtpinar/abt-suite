///<reference path="../../../common/services/utils.ts"/>
import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {parseNestedEntities} from "src/app/common/services/utils";
import {FarmModel} from "../../models/farm.model";
import {FarmerModel} from '../../../farmers/models/farmer.model';
import {formatDecimal} from "src/app/common/components/formats";
import {Router} from "@angular/router";
import {identifierModuleUrl} from "@angular/compiler";
import {FarmsConfigService} from "../../services/farms-config.service";
import {AuthService} from "src/app/auth/services/auth.service";
import {CodeTablesService} from '../../../common/services/code-tables.service';


@Component({
    selector: 'app-farm-form',
    templateUrl: './farm-form.component.html',
    styleUrls: ['./farm-form.component.sass']
})
export class FarmFormComponent implements OnInit, OnChanges, OnDestroy {

    isLoading = false;
    isEdit = false;
    farmForm: FormGroup = this.toFormGroup();

    subscriptions$: Subscription[] = [];

    @Input()
    farm: FarmModel;

    @Input()
    initialFarmer: FarmerModel;

    @Input()
    availableCodeTables: any;

    /* @Input()
     availableTobaccoClasses: any;*/

    /*@Input()
     availableProducts: any;*/

    @Output()
    create = new EventEmitter<FarmModel>();

    @Output()
    update = new EventEmitter<FarmModel>();

    constructor(private router: Router,
                private formBuilder: FormBuilder,
                public codeTablesService: CodeTablesService,
                private configService: FarmsConfigService,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.isLoading = true;
        this.setControlListeners();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.farm) {
            this.isEdit = !!this.farm.id;
            this.farm = parseNestedEntities(this.farm);
            this.farmForm.patchValue(this.farm);
        } else {
            this.router.navigateByUrl(`contracts`);
        }

        if (changes['initialFarmer']) {
            this.farmForm.get('farmer').setValue(changes['initialFarmer'].currentValue);
            this.isLoading = false;
        }

        if (changes['availableCodeTables']) {
            this.isLoading = false;
        }
    }

    ngOnDestroy(): void {
        /*this.subscriptions$.forEach(sub$ => sub$.unsubscribe());*/
    }

    /*get status() {
     if (this.contract)
     return this.configService.formatStateColumn(this.contract.state);
     return '';
     }*/

    get comercial() {
        const {first_name, last_name} = this.authService.user;
        return `${first_name} ${last_name}`;
    }

    setControlListeners() {
        /*const plantingArea$ = this.contractForm.get('planting_area').valueChanges.subscribe(value => {
         if (value) {
         this.calcPlanting('thousands_plants', value);
         }
         });
         this.subscriptions$.push(plantingArea$);

         const thousandsPlants$ = this.contractForm.get('thousands_plants').valueChanges.subscribe(value => {
         if (value) {
         this.calcPlanting('planting_area', value);
         }
         });
         this.subscriptions$.push(thousandsPlants$);

         const plantingType$ = this.contractForm.get('planting_type').valueChanges.subscribe(value => {
         if (value) {
         if (this.contractForm.get('thousands_plants').value)
         this.calcPlanting('planting_area', this.contractForm.get('thousands_plants').value);
         else if (this.contractForm.get('planting_area').value)
         this.calcPlanting('thousands_plants', this.contractForm.get('planting_area').value);
         }
         });
         this.subscriptions$.push(plantingType$);

         const production$ = this.contractForm.get('production').valueChanges.subscribe(value => {
         if (value && this.contractForm.get('planting_area').value) {
         const performance = value / 21.74 / this.contractForm.get('planting_area').value;
         this.contractForm.get('performance').setValue(formatDecimal(performance, 2));
         }
         });
         this.subscriptions$.push(plantingType$);*/
    }

    /*changePlantingTypeHandler(event) {
     if (this.contractForm.get('thousands_plants').value)
     this.calcPlanting('planting_area', this.contractForm.get('thousands_plants').value, event);
     else if (this.contractForm.get('planting_area').value)
     this.calcPlanting('thousands_plants', this.contractForm.get('planting_area').value, event);
     }*/

    getCodeTableItems(codeTableName: string) {
        if (this.availableCodeTables && this.availableCodeTables.combinedTableCodes && this.availableCodeTables.combinedTableCodes[codeTableName]) {
            return this.availableCodeTables.combinedTableCodes[codeTableName];
        }
        return [];
    }

    /*getCodeTableItemName(codeTableName: string, id: string, idProp = 'code', displayProp = 'name') {
     if (this.availableCodeTables && this.availableCodeTables.combinedTableCodes && this.availableCodeTables.combinedTableCodes[codeTableName]) {
     const items = this.availableCodeTables.combinedTableCodes[codeTableName];
     const item = items ? items.find(element => element[idProp] == id) : null;
     return item ? item[displayProp] : id;
     }
     return id;
     }*/

    /*private calcPlanting(controlName, value, plantingType=null) {
     const formControl = this.contractForm.get(controlName) as FormControl;
     // if (!formControl.value || !formControl.touched) {
     const plantingTypeControl = this.contractForm.get('planting_type') as FormControl;
     plantingType = plantingType ? plantingType : plantingTypeControl.value;
     if (plantingType == 'TR') {
     const calc = controlName == 'planting_area' ? value / 32000 : value * 32000;
     formControl.setValue(formatDecimal(calc, 2), {emitEvent:false});
     }
     if (plantingType == 'DH') {
     const calc = controlName == 'planting_area' ? value / 38000 : value * 38000;
     formControl.setValue(formatDecimal(calc, 2), {emitEvent:false});
     }
     // }
     }
     */
    get selectedFarmer() {
        return this.farmForm.get('farmer').value;
    }

    toFormGroup(): FormGroup {
        return this.formBuilder.group({
            farmer: [null, Validators.required],
            record_number: [null, Validators.required],
            activation_date: [null, Validators.required],
            expiration_date: [null, Validators.required],
            total_area: [null, Validators.required],
            coordinates: [null],
            ground_feature_code: [null, Validators.required],
            possesion_type_code: [null, Validators.required],
        });
    }

    prepareEntity(formValue) {
        const {
            farmer,
            record_number,
            activation_date,
            expiration_date,
            total_area,
            coordinates,
            ground_feature_code,
            possesion_type_code,
        } = formValue;

        let entity = {
            id: this.isEdit ? this.farm.id : null,
            farmer_id: farmer.id,
            record_number,
            activation_date,
            expiration_date: this.calculateExpirationDate(),
            total_area,
            coordinates,
            ground_feature_code,
            possesion_type_code,
            allotments: this.farm.allotments
        };

        return entity;
    }

    onSave(form: FormGroup): void {
        const {valid} = form;

        if (valid) {
            const entity = this.prepareEntity(form.value);

            if (!this.isEdit) {
                this.create.emit(entity);
            } else {
                this.update.emit(entity);
            }
        }
    }

    calculateExpirationDate() {
        var activation_date = this.farmForm.get('activation_date').value;
        var activation_year = this.farmForm.get('expiration_date').value;

        let activaion_date_spliter = activation_date.split('-');
        let year = parseInt(activaion_date_spliter[0], 10) + activation_year;

        return year + '-' + activaion_date_spliter[1] + '-' + activaion_date_spliter[2]
    }

}
