import { IEntity } from '../../../common/models/IEntity';

export interface SimModel extends IEntity {
  number?: string;
  usim?: boolean;
  pin?: string;
  puk?: string;
  ip_address?: string;
}
