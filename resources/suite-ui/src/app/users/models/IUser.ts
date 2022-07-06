import { IEntity } from '../../common/models/IEntity';

export interface IUser extends IEntity {
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  phone?: string;
  picture?: string | ArrayBuffer;
  active: boolean;
  fullName: string;
  roles: any[];
}
