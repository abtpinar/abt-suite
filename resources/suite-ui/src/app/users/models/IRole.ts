import { IEntity } from '../../common/models/IEntity';

export interface IRole extends IEntity {
  /**
   * Name of the role.
   */
  name: string;

  key?: string;

  /**
   * Description of the role.
   */
  description: string;
}
