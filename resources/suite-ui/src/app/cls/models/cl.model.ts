import { IEntity } from '../../common/models/IEntity';

export interface CLModel extends IEntity {
  farmer_id?: number;
  farmer_code?: string;
  farmer_name?: string;
  credit_card?: string;
  unit_id?: number;
  unit_name?: string;
  kilograms?: number;
  tobacco_type?: string;
  amount?: number;
  status?: string;
  expense?: number;
  refunds?: string;
}

export enum CLStates {
  Imported = 'IMPORTED',
  Updated = 'UPDATED',
  InProgress = 'IN_PROGRESS',
  FixedFee = 'FIXED_FEE',
  Refunded = 'REFUNDED',
  Paid = 'PAID',
  Finished = 'FINISHED'
}
