import { IEntity } from '../../common/models/IEntity';

export interface CLPaymentModel extends IEntity {
  start_date?: string;
  status?: string;
}
