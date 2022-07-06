import {Injectable} from '@angular/core';
import {MessageDialogComponent} from '../components/message-dialog/message-dialog.component';

/**
 * Service used to notify events to the User.
 */
@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private _component: MessageDialogComponent;


    /**
     * Register an instance of MessageDialogComponent internally to use it to render the notifications.
     *
     * @param {MessageDialogComponent} component: Which will render the notifications coming to this service.
     */
    register(component: MessageDialogComponent): void {
        this._component = component;
    }

    /**
     * Displays the error notification that lasts an interval in milliseconds.
     *
     * @param {string} error: The error message to display.
     * @param {number} interval: The interval in milliseconds.
     */
    showError(error: string, interval: number = 20000): void {
        this._component.showError(error, interval);
    }

    /**
     * Displays the success notification that lasts an interval in milliseconds.
     *
     * @param {string} message: The message to display.
     * @param {number} interval: The interval in milliseconds.
     */
    showSuccess(message: string, interval: number = 6000): void {
        this._component.showSuccess(message, interval);
    }
    
    /**
     * Displays the warning notification that lasts an interval in milliseconds.
     *
     * @param {string} message: The message to display.
     * @param {number} interval: The interval in milliseconds.
     */
    showWarning(message: string, interval: number = 10000): void {
        this._component.showWarning(message, interval);
    }
}
