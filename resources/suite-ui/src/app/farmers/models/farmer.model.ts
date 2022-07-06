import { ContractModel } from 'src/app/contracts/models/contract.model';
import { IEntity } from '../../common/models/IEntity';
import {ProductionUnitModel} from '../../parameters/general/models/production-unit.model';

export interface FarmerModel extends IEntity {
  code?: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  telephone_number?: number;
  picture?: string | ArrayBuffer;
  production_unit_id?: number;
  active?: string;
  ci?: string;
  contracts?: { data: ContractModel[] };
  farms?: { data: FarmerModel[] }
  unit?: {data: ProductionUnitModel[]};
  cup_card?: string;
  mlc_card?: string;
}
