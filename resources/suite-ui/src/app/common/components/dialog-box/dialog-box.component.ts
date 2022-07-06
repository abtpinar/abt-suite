import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Describes the contract of a message dialog.
 */
export interface IMessageDialog {
  /**
   * Asks the user about something important which cannot proceed if the user does not agree.
   *
   * @param {string} message: The message the dialog must display in its body.
   * @param {string} title: The title of the dialog.
   * @return {Observable<boolean>} which eventually emits the user's response.
   */
  askUser(message: string, title: string): Observable<boolean>;
}

/**
 * This component hosts the dialog that is to be popped each time the system should confirm some action with the user
 * first.
 */
@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.sass']
})
export class DialogBoxComponent {
  title: string;
  message: string;
  disable: boolean = false;
  cancelText: string;
  acceptText: string;

  @Output() dialogResult = new EventEmitter<boolean>();

  onCancel(): void {
    this.dialogResult.emit(false);
  }

  onAccept(): void {
    this.disable = true;
    this.dialogResult.emit(true);
  }
}
