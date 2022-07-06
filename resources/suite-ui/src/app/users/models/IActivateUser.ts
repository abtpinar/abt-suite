import {IUser} from './IUser';

/**
 * Describes an activate user.
 */
export interface IActivateUser extends IUser {
    /**
     * Url to return for enable the user.
     */
    url: string;
}
