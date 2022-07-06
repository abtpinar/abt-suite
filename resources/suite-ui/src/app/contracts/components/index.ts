import { ContractFormComponent } from "./contract-form/contract-form.component";
import { ContractHarvestScheduleFormComponent } from "./contract-harvest-schedule-form/contract-harvest-schedule-form.component";
import { ContractIrrigationScheduleFormComponent } from "./contract-irrigation-schedule-form/contract-irrigation-schedule-form.component";
import { ContractPlantingScheduleFormComponent } from "./contract-planting-schedule-form/contract-planting-schedule-form.component";
import { ContractProductFormComponent } from "./contract-product-form/contract-product-form.component";
import { ContractTobaccoClassScheduleFormComponent } from "./contract-tobacco-class-schedule-form/contract-tobacco-class-schedule-form.component";

export const components: any[] = [
  ContractFormComponent,
  ContractPlantingScheduleFormComponent,
  ContractIrrigationScheduleFormComponent,
  ContractTobaccoClassScheduleFormComponent,
  ContractProductFormComponent,
  ContractHarvestScheduleFormComponent
];

export * from './contract-form/contract-form.component';
export * from './contract-planting-schedule-form/contract-planting-schedule-form.component';
export * from './contract-irrigation-schedule-form/contract-irrigation-schedule-form.component';
export * from './contract-tobacco-class-schedule-form/contract-tobacco-class-schedule-form.component';
export * from './contract-product-form/contract-product-form.component';
export * from './contract-harvest-schedule-form/contract-harvest-schedule-form.component';