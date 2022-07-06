import { IEntity } from '../../../common/models/IEntity';
import { MobileBrandModel } from './mobile-brand.model';
import { MobileModel } from './mobile.model';

export interface MobileModelModel extends IEntity {
  name?: string;
  mobile_brand_id?: number;
  mobile_brand?: { data: MobileBrandModel }
  mobiles?: { data: MobileModel[] }

}
