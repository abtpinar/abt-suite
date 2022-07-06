import { Injectable, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import { of } from 'rxjs';

/**
 * A service to present dialogs to the user asking for confirmation or for making operations that require the rest of
 * the application stopped until such operation finishes.
 */
@Injectable({
  providedIn: 'root'
})
export class DialogService {
  // @ViewChild("outlet", {read: ViewContainerRef}) outletRef: ViewContainerRef;
  // @ViewChild("content", {read: TemplateRef}) contentRef: TemplateRef<any>;

  constructor() { }

  /**
   * Shows a dialog asking the user for a particular concession.
   *
   * @param {string} message: The message that notifies the user what kind of concession she must agree to permit.
   * @param {string} title: The title to display in the top side of the dialog.
   * @returns {Observable<boolean>} which will eventually return whether the user agreed to concent what was being asked
   * or not.
   */
  askUser(
    message: string,
    title: string,
    cancelText = 'dialog-box.no',
    acceptText = 'dialog-box.yes'): Observable<boolean> {

    // this.outletRef.clear();
    // this.outletRef.createEmbeddedView(this.contentRef);

    // const dialogRef = this.bsModal.show(DialogBoxComponent, {
    //   animated: true,
    //   initialState: {
    //     message,
    //     title,
    //     cancelText,
    //     acceptText
    //   },
    //   ignoreBackdropClick: true
    // });

    // const dialogComponentRef = dialogRef.content as DialogBoxComponent;
    // const obs = dialogComponentRef.dialogResult;

    // obs
    //   .pipe(
    //     tap(v => {
    //       console.log(v);
    //       dialogRef.hide();
    //     }),
    //     take(1)
    //   )
    //   .subscribe();

    // return obs;
    return of(true);
  }

  /**
   * Shows a dialog box that asks the user for a certain concession allowing the option to accept, deny or cancel.
   *
   * @param {string} message: The message that notifies the user what kind of concession she must agree to permit.
   * @param {string} title: The title to display in the top side of the dialog.
   * @param {boolean} useBtnNo: On some occasions it is not required to perform actions for the No button with the one to cancel enough.
   * @returns {Observable<string>} which will eventually return whether the user agreed to concent what was being asked
   * or not.
   */
  // askUserOptions(message: string, title: string, useBtnNo: boolean, textOptions = []): Observable<string> {
  //   const dialogRef = this.bsModal.show(DialogBoxCancelComponent, {
  //     animated: true,
  //     initialState: {
  //       message,
  //       title,
  //       useBtnNo,
  //       textOptions
  //     },
  //     ignoreBackdropClick: true
  //   });

  //   const dialogComponentRef = dialogRef.content as DialogBoxCancelComponent;
  //   const obs = dialogComponentRef.dialogResult;

  //   obs
  //     .pipe(
  //       tap(v => {
  //         dialogRef.hide();
  //       }),
  //       take(1)
  //     )
  //     .subscribe();

  //   return obs;
  // }

}
