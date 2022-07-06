import {ContractsPageComponent} from './contracts-page/contracts-page.component';
import {ContractsItemComponent} from './contracts-item/contracts-item.component';
import {ContractPlantingScheduleComponent} from './contract-planting-schedule/contract-planting-schedule.component';
import {ContractIrrigationScheduleComponent} from './contract-irrigation-schedule/contract-irrigation-schedule.component';
import {ContractTobaccoClassScheduleComponent} from './contract-tobacco-class-schedule/contract-tobacco-class-schedule.component';
import {ContractProductComponent} from './contract-product/contract-product.component';
import {ContractHarvestScheduleComponent} from './contract-harvest-schedule/contract-harvest-schedule.component';
import {ContractsDashboard} from "./contracts-dashboard/contracts-dasboard.component";

export const containers: any[] = [
    ContractsPageComponent,
    ContractsItemComponent,
    ContractPlantingScheduleComponent,
    ContractIrrigationScheduleComponent,
    ContractTobaccoClassScheduleComponent,
    ContractProductComponent,
    ContractHarvestScheduleComponent,
    ContractsDashboard
];

export * from './contracts-page/contracts-page.component';
export * from './contracts-item/contracts-item.component';
export * from './contract-planting-schedule/contract-planting-schedule.component';
export * from './contract-irrigation-schedule/contract-irrigation-schedule.component';
export * from './contract-tobacco-class-schedule/contract-tobacco-class-schedule.component';
export * from './contract-product/contract-product.component';
export * from './contract-harvest-schedule/contract-harvest-schedule.component';
export * from './contracts-dashboard/contracts-dasboard.component';
