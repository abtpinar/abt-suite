import { IEntity } from '../../common/models/IEntity';

export interface ProductModel extends IEntity {
  code?: string;
  name?: string;
  price?: number;
  price_history?: number;
  active?: string;
  expense_concept?: string,
  consumption_standard_tp?: number;
  consumption_standard_v1?: number;
  consumption_standard_v2?: number;
  consumption_standard_sp?: number;
  consumption_standard_by?: number;
  consumption_standard_vg?: number;
  category_name?: any;
}
