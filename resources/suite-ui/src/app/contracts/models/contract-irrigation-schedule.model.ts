import { IEntity } from '../../common/models/IEntity';

export interface ContractIrrigationScheduleModel extends IEntity {
  position?: number;
  return_entity?: boolean;

  tobacco_family?: string;
  month?: number;
  amount_p1?: number;
  amount_p2?: number;
  amount_p3?: number;
  contract_id?: number;
}
