import {
    Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges,
    ViewChild
} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {parseNestedEntities} from "src/app/common/services/utils";
import {ContractModel} from "../../models/contract.model";
import {FarmerModel} from '../../../farmers/models/farmer.model';
import {formatDecimal} from "src/app/common/components/formats";
import {Router} from "@angular/router";
import {CodeTablesService} from "src/app/common/services/code-tables.service";
import {identifierModuleUrl} from "@angular/compiler";
import {ContractsConfigService} from "../../services/contracts-config.service";
import {AuthService} from "src/app/auth/services/auth.service";
import {ContractsSandbox} from '../../contracts.sandbox';
import {ContractsService} from '../../services/contracts.service';
import {LanguageService} from '../../../i18n/services/language.service';
import {NotificationService} from  '../../../common/services/notification.service';
import {ContractHarvestScheduleFormComponent} from "../contract-harvest-schedule-form/contract-harvest-schedule-form.component";
import {ContractHarvestScheduleComponent} from "../../containers/contract-harvest-schedule/contract-harvest-schedule.component";


@Component({
    selector: 'app-contract-form',
    templateUrl: './contract-form.component.html',
    styleUrls: ['./contract-form.component.sass']
})
export class ContractFormComponent implements OnInit, OnChanges, OnDestroy {

    isLoading = false;
    isEdit = false;
    contractForm: FormGroup = this.toFormGroup();

    subscriptions$: Subscription[] = [];
    tobaccoType = '';
    isTP: boolean = false;
    ton = 0;
    /*purchaseBudget:number = 0;*/

    @Input()
    contract: ContractModel;

    @Input()
    initialFarmer: FarmerModel;

    @Input()
    availableCodeTables: any;

    @Input()
    availableTobaccoTapadoClasses: any;

    @Input()
    availableTobaccoBurleyClasses: any;


    @Input()
    availableProducts: any;

    @Output()
    create = new EventEmitter<ContractModel>();

    @Output()
    update = new EventEmitter<ContractModel>();


    constructor(private sandbox: ContractsSandbox,
                private router: Router,
                private formBuilder: FormBuilder,
                public codeTablesService: CodeTablesService,
                private configService: ContractsConfigService,
                private itemService: ContractsService,
                private authService: AuthService,
                protected lengaugeService: LanguageService,
                protected notificationService: NotificationService,) {
    }

    ngOnInit() {
        this.isLoading = true;
        this.setControlListeners();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.contract) {
            this.isEdit = !!this.contract.id;
            this.contract = parseNestedEntities(this.contract);
            this.contractForm.patchValue(this.contract);
        } else {
            this.router.navigateByUrl(`contracts`);
        }

        if (changes['initialFarmer']) {
            this.contractForm.get('farmer').setValue(changes['initialFarmer'].currentValue);
        }

        if (changes['availableCodeTables']) {
            this.isLoading = false;
        }
    }

    ngOnDestroy(): void {
        this.subscriptions$.forEach(sub$ => sub$.unsubscribe());
    }

    get status() {
        if (this.contract)
            return this.configService.formatStateColumn(this.contract.state);
        return '';
    }

    get comercial() {
        const {first_name, last_name} = this.authService.user;
        return `${first_name} ${last_name}`;
    }

    setControlListeners() {
        const tobaccoType = this.contractForm.get('tobacco_type').value;
        const plantingArea$ = this.contractForm.get('planting_area').valueChanges.subscribe(value => {
            if (value) {
                this.calcPlanting('thousands_plants', value, tobaccoType);
            }
        });
        this.subscriptions$.push(plantingArea$);

        const thousandsPlants$ = this.contractForm.get('thousands_plants').valueChanges.subscribe(value => {
            if (value) {
                this.calcPlanting('planting_area', value, tobaccoType);
            }
        });
        this.subscriptions$.push(thousandsPlants$);

        const plantingType$ = this.contractForm.get('planting_type').valueChanges.subscribe(value => {
            if (value) {
                if (this.contractForm.get('thousands_plants').value)
                    this.calcPlanting('planting_area', this.contractForm.get('thousands_plants').value, tobaccoType);
                else if (this.contractForm.get('planting_area').value)
                    this.calcPlanting('thousands_plants', this.contractForm.get('planting_area').value, tobaccoType);
            }
        });
        this.subscriptions$.push(plantingType$);

        const ton$ = this.itemService.ton$.subscribe(ton => {
            this.ton = ton;
            console.log('ton: ' + this.ton);
        });
        this.subscriptions$.push(ton$);

        const production$ = this.contractForm.get('production').valueChanges.subscribe(value => {
            if (value && this.contractForm.get('planting_area').value) {
                const performance = value / 21.74 / this.contractForm.get('planting_area').value;
                this.contractForm.get('performance').setValue(formatDecimal(performance, 2));
                this.itemService.ton$.emit(value / 21.74);
            }
        });
        this.subscriptions$.push(production$);

        const isTp$ = this.itemService.isTP$.subscribe(isTP => {
            this.isTP = isTP;
            console.log('Tapado: ' + this.isTP);
        });
        this.subscriptions$.push(isTp$);

        const tobaccoType$ = this.itemService.tobaccoType$.subscribe(tobaccoType => {
            this.tobaccoType = tobaccoType;
            console.log('tp: ' + this.tobaccoType);
        });
        this.subscriptions$.push(tobaccoType$);


    }

    changePlantingTypeHandler(event) {
        if (this.contractForm.get('thousands_plants').value)
            this.calcPlanting('planting_area', this.contractForm.get('thousands_plants').value, event, this.contractForm.get('tobacco_type').value);
        else if (this.contractForm.get('planting_area').value)
            this.calcPlanting('thousands_plants', this.contractForm.get('planting_area').value, event, this.contractForm.get('tobacco_type').value);
    }

    changeTobaccoTypeHandler(event) {
        if (event == 'TP' || event == 'BY') {
            this.itemService.isTP$.emit(true);
        } else {
            this.itemService.isTP$.emit(false);
        }
        this.itemService.tobaccoType$.emit(event);
        if (this.contractForm.get('thousands_plants').value || this.contractForm.get('tobacco_type').value)
            this.calcPlanting('planting_area', this.contractForm.get('thousands_plants').value, this.contractForm.get('planting_type').value, event);
        else if (this.contractForm.get('planting_area').value || this.contractForm.get('tobacco_type').value)
            this.calcPlanting('thousands_plants', this.contractForm.get('planting_area').value, this.contractForm.get('planting_type').value, event);
    }

    getCodeTableItems(codeTableName: string) {
        if (this.availableCodeTables && this.availableCodeTables.combinedTableCodes && this.availableCodeTables.combinedTableCodes[codeTableName]) {
            return this.availableCodeTables.combinedTableCodes[codeTableName];
        }
        return [];
    }

    getCodeTableItemName(codeTableName: string, id: string, idProp = 'code', displayProp = 'name') {
        if (this.availableCodeTables && this.availableCodeTables.combinedTableCodes && this.availableCodeTables.combinedTableCodes[codeTableName]) {
            const items = this.availableCodeTables.combinedTableCodes[codeTableName];
            const item = items ? items.find(element => element[idProp] == id) : null;
            return item ? item[displayProp] : id;
        }
        return id;
    }

    private calcPlanting(controlName, value, plantingType = null, tobaccoType = null) {
        const formControl = this.contractForm.get(controlName) as FormControl;
        // if (!formControl.value || !formControl.touched) {
        const plantingTypeControl = this.contractForm.get('planting_type') as FormControl;
        plantingType = plantingType ? plantingType : plantingTypeControl.value;

        const tobaccoTypeControl = this.contractForm.get('tobacco_type') as FormControl;
        tobaccoType = tobaccoType ? tobaccoType : tobaccoTypeControl.value;
        if (tobaccoType == 'TP') {
            /*this.itemService.isTP$.emit(true);*/
            if (plantingType == 'TR') {
                const calc = controlName == 'planting_area' ? value / 32000 : value * 32000;
                formControl.setValue(formatDecimal(calc, 2), {emitEvent: false});
            }
            if (plantingType == 'DH') {
                const calc = controlName == 'planting_area' ? value / 38000 : value * 38000;
                formControl.setValue(formatDecimal(calc, 2), {emitEvent: false});
            }
        }
        if (tobaccoType == 'V1' || tobaccoType == 'V2') {
            /*this.itemService.isTP$.emit(false);*/
            if (plantingType == 'TR') {
                const calc = controlName == 'planting_area' ? value / 38000 : value * 38000;
                formControl.setValue(formatDecimal(calc, 2), {emitEvent: false});
            }
            if (plantingType == 'DH') {
                const calc = controlName == 'planting_area' ? value / 48000 : value * 48000;
                formControl.setValue(formatDecimal(calc, 2), {emitEvent: false});
            }
        }
        if (tobaccoType == 'BY') {
            /*this.itemService.isTP$.emit(false);*/
            if (plantingType == 'TR') {
                const calc = controlName == 'planting_area' ? value / 19000 : value * 19000;
                formControl.setValue(formatDecimal(calc, 2), {emitEvent: false});
            }
            if (plantingType == 'DH') {
                const calc = controlName == 'planting_area' ? value / 19000 : value * 19000;
                formControl.setValue(formatDecimal(calc, 2), {emitEvent: false});
            }
        }
        if (tobaccoType == 'SP') {
            /*this.itemService.isTP$.emit(false);*/
            if (plantingType == 'TR') {
                const calc = controlName == 'planting_area' ? value / 50000 : value * 50000;
                formControl.setValue(formatDecimal(calc, 2), {emitEvent: false});
            }
            if (plantingType == 'DH') {
                const calc = controlName == 'planting_area' ? value / 63000 : value * 63000;
                formControl.setValue(formatDecimal(calc, 2), {emitEvent: false});
            }
        }
        if (tobaccoType == 'VG') {
            /*this.itemService.isTP$.emit(false);*/
            if (plantingType == 'TR') {
                const calc = controlName == 'planting_area' ? value / 16000 : value * 16000;
                formControl.setValue(formatDecimal(calc, 2), {emitEvent: false});
            }
            if (plantingType == 'DH') {
                const calc = controlName == 'planting_area' ? value / 16000 : value * 16000;
                formControl.setValue(formatDecimal(calc, 2), {emitEvent: false});
            }
        }
        // }
    }

    get selectedFarmer() {
        return this.contractForm.get('farmer').value;
    }

    toFormGroup(): FormGroup {
        return this.formBuilder.group({
            farmer: [null, Validators.required],
            /*property_type: [null, Validators.required],*/
            planting_type: [null, Validators.required],
            tobacco_type: [null, Validators.required],
            planting_area: [null, Validators.required],
            thousands_plants: [null, Validators.required],
            production: [null, Validators.required],
            performance: [null, Validators.required],
            export_porcentage: [null, Validators.required],
            purchase_budget: [null],
        });
    }

    prepareEntity(formValue) {
        const {
            farmer,
            /*property_type,*/
            planting_type,
            tobacco_type,
            planting_area,
            thousands_plants,
            production,
            performance,
            export_porcentage,
            purchase_budget
        } = formValue;

        let entity = {
            id: this.isEdit ? this.contract.id : null,
            farmer_id: farmer.id,
            production_unit_id: farmer.unit.id,
            state: this.validateContractState() ? this.configService.contractStates.Activated : this.configService.contractStates.InProgress,
            /*property_type,*/
            planting_type,
            tobacco_type,
            planting_area,
            thousands_plants,
            production,
            performance,
            export_porcentage,
            /*purchase_budget,*/
            contract_planting_schedules: this.contract.contract_planting_schedules,
            /*contract_irrigation_schedules: this.contract.contract_irrigation_schedules,*/
            contract_tobacco_class_schedules: this.contract.contract_tobacco_class_schedules,
            /*contract_harvest_schedules: this.contract.contract_harvest_schedules,*/
            contract_products: this.contract.contract_products
        };

        return entity;
    }

    onSave(form: FormGroup): void {
        console.log(this.validateContractState());
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

        onSaveAndContinueAdd(form :FormGroup)
        {
            console.log(this.validateContractState());
            const {valid} = form;

            if (valid) {
                const entity = this.prepareEntity(form.value);
                this.sandbox.addContractAndContinue(entity);
                this.customResetFormGroup();
            }
        }

        customResetFormGroup()
        {
            /*this.contractForm.get('property_type').reset();*/
            this.contractForm.get('planting_type').reset();
            this.contractForm.get('tobacco_type').reset();
            this.contractForm.get('planting_area').reset();
            this.contractForm.get('thousands_plants').reset();
            this.contractForm.get('production').reset();
            this.contractForm.get('performance').reset();
            this.contractForm.get('export_porcentage').reset();
            this.contractForm.get('purchase_budget').reset();
            /*for (let index = 0; index < this.contract.contract_harvest_schedules.length; index++)
                this.contract.contract_harvest_schedules.splice(index, 1)*/
            while (this.contract.contract_products.length > 0){
                this.contract.contract_products.pop();//splice(index, 1)
            }

            /*for (let index = 0; index < this.contract.contract_irrigation_schedules.length; index++)
                this.contract.contract_irrigation_schedules.splice(index, 1)*/
            while (this.contract.contract_planting_schedules.length > 0){
                this.contract.contract_planting_schedules.pop();//splice(index, 1)
            }
            while (this.contract.contract_tobacco_class_schedules.length > 0){
                this.contract.contract_tobacco_class_schedules.pop();//splice(index, 1)
            }
        }

        validateContractState()
    :
        boolean
        {
            return this.contract.contract_planting_schedules.length > 0 &&
                ((this.contractForm.get('tobacco_type').value == 'TP' ||
                 this.contractForm.get('tobacco_type').value == 'BY' &&
                this.contract.contract_tobacco_class_schedules.length > 0) ||
                (this.contractForm.get('tobacco_type').value != 'TP' &&
                this.contractForm.get('tobacco_type').value != 'BY' &&
                this.contract.contract_tobacco_class_schedules.length == 0));
        }

    }
