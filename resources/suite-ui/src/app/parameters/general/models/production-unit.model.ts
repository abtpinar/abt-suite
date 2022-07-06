import { IEntity } from '../../../common/models/IEntity';

export interface ProductionUnitModel extends IEntity {
  code?: string;
  name?: string;
  address?: string;
  president_name?: string;
  president_agreement_number?: string;
  bank?: string;
  bank_account?: string;
  active?: boolean;
}
