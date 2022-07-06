import {Component} from '@angular/core';
import {NotificationService} from '../../services/notification.service';

/**
 * A component to display messages to the user. The message may be of different meanings (error, notification, warning, information among
 * others).
 */
@Component({
    selector: 'app-message-dialog',
    templateUrl: './message-dialog.component.html',
    styleUrls: ['./message-dialog.component.css']
})
export class MessageDialogComponent {
    public messageType: number;
    public message: string;
    public visible: boolean;

    private _timeoutHandler: number;
    private ERROR = 1;
    private SUCCESS = 2;
    private WARNING = 3;


    /**
     * Initializes a new instance of MessageDialogComponent class with required services.
     *
     * @param {NotificationService} notificationService: Service to receive notification requests so that the current component can present
     * them to the user.
     */
    constructor(private notificationService: NotificationService) {
        notificationService.register(this);
    }


    /**
     * Gets whether the message to present is an error or not.
     *
     * @returns {boolean} true if the message is an error; false otherwise.
     */
    get isError(): boolean {
        return this.messageType === this.ERROR;
    }

    /**
     * Gets whether the message to present is a success or not.
     *
     * @returns {boolean} true if the message is an success; false otherwise.
     */
    get isSuccess(): boolean {
        return this.messageType === this.SUCCESS;
    }
    
    /**
     * Gets whether the message to present is a warning or not.
     *
     * @returns {boolean} true if the message is an warning; false otherwise.
     */
    get isWarning(): boolean {
        return this.messageType === this.WARNING;
    }

    /**
     * Closes the current message dialog.
     */
    close(): void {
        clearTimeout(this._timeoutHandler);
        this.visible = false;
    }

    /**
     * Shows an error that will vanish after a given interval.
     *
     * @param {string} error: The message to display.
     * @param {number} interval: Milliseconds before hiding the message dialog again.
     */
    showError(error: string, interval: number = 10000): void {
        this.message = error;
        this.messageType = this.ERROR;
        this.visible = true;
        this._timeoutHandler = window.setTimeout(() => this.visible = false, interval);
    }

    /**
     * Shows an error that will vanish after a given interval.
     *
     * @param {string} message: The message to display.
     * @param {number} interval: Milliseconds before hiding the message dialog again.
     */
    showSuccess(message: string, interval: number = 4000): void {
        this.message = message;
        this.messageType = this.SUCCESS;
        this.visible = true;
        this._timeoutHandler = window.setTimeout(() => this.visible = false, interval);
    }
    
    /**
     * Shows an error that will vanish after a given interval.
     *
     * @param {string} message: The message to display.
     * @param {number} interval: Milliseconds before hiding the message dialog again.
     */
    showWarning(message: string, interval: number = 4000): void {
        this.message = message;
        this.messageType = this.WARNING;
        this.visible = true;
        this._timeoutHandler = window.setTimeout(() => this.visible = false, interval);
    }
}
