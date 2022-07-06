import { IEntity } from '../../../common/models/IEntity';

export interface ClassModel extends IEntity {
  name?: string;
  type?: string;
  group?: string;
  price?: number;
  price_history?: string;
  active?: boolean;
  tobacco_type?: string;
}
