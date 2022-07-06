import { IEntity } from '../../../common/models/IEntity';
import { MobileModelModel } from './mobile-model.model';

export interface MobileModel extends IEntity {
  mac?: string;
  imei?: string;
  imei2?: string;
  mobile_brand_id?: number;
  mobile_model_id?: number;
  mobile_model?: { data: MobileModelModel }
  brand?: string;
  model?: string;
}
