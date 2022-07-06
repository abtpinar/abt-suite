import { IEntity } from '../../../common/models/IEntity';
import { MobileModelModel } from './mobile-model.model';

export interface MobileBrandModel extends IEntity {
  name?: string;
  mobile_models?: { data: MobileModelModel[] }
}
