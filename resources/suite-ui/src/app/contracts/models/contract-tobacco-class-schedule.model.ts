import { IEntity } from '../../common/models/IEntity';

export interface ContractTobaccoClassScheduleModel extends IEntity {
  position?: number;
  return_entity?: boolean;

  amount?: number;
  price?: number;
  contract_id?: number;
  tobacco_class_id?: number;
}
