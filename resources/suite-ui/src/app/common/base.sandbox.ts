import * as fromRoot from '../@rootStore';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';

/**
 * Sandbox base class. Any injectable sandbox should inherit from this class.
 */
export abstract class Sandbox {
  // private openModalRefs: BsModalRef[] = [];

  /**
   * Selects loading status from the application UI State
   */
  public appIsLoading$: Observable<boolean> = this.rootStore$.pipe(
    select(fromRoot.selectAppIsLoading)
  );

  /**
   * Selects the modal (opened/closed) state from the app UI state
   */
  uiModalOpen$: Observable<boolean> = this.rootStore$.pipe(
    select(fromRoot.selectModalIsOpen)
  );

  /**
   * Selects the upload in progress state (whether the app is busy or not)
   */
  public uploadInProgress$: Observable<boolean> = this.rootStore$.pipe(
    select(fromRoot.selectUploadInProgress)
  );

  /**
   * Selects the download in progress state (whether the app is busy or not)
   */
  public downloadInProgress$: Observable<boolean> = this.rootStore$.pipe(
    select(fromRoot.selectDownloadInProgress)
  );

  constructor(
    protected rootStore$: Store<fromRoot.AppState>
  ) {}

  /**
   * Displays a component in a modal using ngx-bootstrap. The component must be added to the
   * 'entryComponents' array in the module decorator of the module it belongs to.
   * @param component The component to show in the modal (component instance variable)
   * @param opts
   * @param data An object with an initialState property { initialState: Object }. Any property set
   * in the initialState object will be matched with a class member variable with the same name in
   * the targeted component.
   */
  public showModal() {
    this.rootStore$.dispatch(new fromRoot.OpenModal());
  }
  // public showModal(component: any, { initialState }, opts?: ModalOptions) {
  //   this.rootStore$.dispatch(new fromRoot.OpenModal());
  //   const options = opts ? {...opts, ignoreBackdropClick: true} : {ignoreBackdropClick: true};
  //   const modalRef = this.bsModal.show(component, {
  //     initialState,
  //     ...options
  //   });
  //   this.openModalRefs.push(modalRef);
  //   return modalRef;
  // }

  /**
   * Dispatches a state change that sets the global state of the modal to closed
   */
  closeModal() {
    this.rootStore$.dispatch(new fromRoot.CloseModal());
  }

  protected downloadFile(downloadUrl, fileName, mimeType) {
    this.rootStore$.dispatch(
      new fromRoot.DownloadFile({ downloadUrl, fileName, mimeType })
    );
  }

  protected uploadFiles(uploadUrl, files: { [key: string]: File }) {
    this.rootStore$.dispatch(new fromRoot.UploadFiles({ uploadUrl, files }));
  }

  // closeAllModals() {
  //   this.rootStore$.dispatch(new fromRoot.CloseModal());
  //   this.openModalRefs.forEach(mref => mref.hide());
  // }

  goBack() {
    this.rootStore$.dispatch(new fromRoot.Back());
  }
}
