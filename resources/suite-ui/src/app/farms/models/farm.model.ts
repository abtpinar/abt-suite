import { IEntity } from '../../common/models/IEntity';
import {FarmAllotmentModel} from './farm-allotment.model';
import {FarmerModel} from '../../farmers/models/farmer.model';
import {ProductionUnitModel} from "../../parameters/general/models/production-unit.model";

export interface FarmModel extends IEntity {
  id?: number;
  record_number?: string;
  activation_date?: string;
  expiration_date?: string;
  coordinates?: string;
  version?: string;
  origin?: number;
  ground_feature_code?: string;
  possesion_type_code?: number;
  possesion_type?: any;
  ground_feature?: any;
  unit?: any;
  farmer_id?: number;
  farmer?: { data: FarmerModel } ;
  state?: number;

  allotments?: any;/*{ data: FarmAllotmentModel[] } | FarmAllotmentModel[] ;*/
}

export enum FarmStates {
  Active = 'Active',
  Expired = 'Expired',
}
