import { FarmerModel } from 'src/app/farmers/models/farmer.model';
import { IEntity } from '../../common/models/IEntity';

export interface ContractModel extends IEntity {
  version?: string;
  origin?: string;
  state?: string;
  date?: string;
  expiration_date?: string;
  planting_area?: number;
  thousands_plants?: number;
  production?: number;
  performance?: number;
  export_porcentage?: number;
  purchase_budget?: number;
  unit?: string;
  production_unit_id?: number;
  production_unit?: any;
  farmer_id?: number;
  farmer?: { data: FarmerModel };
  property_type?: string;
  planting_type?: string;
  tobacco_type?: string;
  tobacco_type_name?: any;
  contract_planting_schedules?: any;//{ data: ContractPlantingScheduleModel[] } | ContractPlantingScheduleModel[];
  contract_irrigation_schedules?: any;//{ data: ContractIrrigationScheduleModel[] } | ContractIrrigationScheduleModel[];
  contract_harvest_schedules?: any;//{ data: ContractIrrigationScheduleModel[] } | ContractIrrigationScheduleModel[];
  contract_tobacco_class_schedules?: any;//{ data: ContractTobaccoClassScheduleModel[] } | ContractTobaccoClassScheduleModel[];
  contract_products?: any;//{ data: ContractTobaccoClassScheduleModel[] } | ContractTobaccoClassScheduleModel[];
}

export enum ContractStates {
  Draft = 'DRAFT',
  InProgress = 'IN_PROGRESS',
  Accepted = 'ACCEPTED',
  Activated = 'ACTIVATED',
  Rejected = 'REJECTED',
  Annulled = 'ANNULLED',
  Discharged = 'DISCHARGED',
  Suspended = 'SUSPENDED'
}
