import { IEntity } from '../../common/models/IEntity';

export interface ContractProductModel extends IEntity {
  position?: number;
  return_entity?: boolean;

  amount?: number;
  price?: number;
  contract_id?: number;
  product_id?: number;

  measurement_unit?: string;
  basic?: boolean;
}
