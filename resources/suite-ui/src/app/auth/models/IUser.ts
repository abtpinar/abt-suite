import { IRole } from 'src/app/users/models/IRole';
import {IEntity} from '../../common/models/IEntity';

/**
 * Describes the information handled about the authenticated user.
 */
export interface IUser extends IEntity {
    email?: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    picture?: string | ArrayBuffer;
    active?: boolean;
    fullName?: string;
    roles: IRole[];
}
