import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonSandbox } from '../../common.sandbox';

// To use jquery function in component
declare var $: any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit, OnDestroy {

  @Input()
  title: string;

  @Input()
  id: string;

  @Input()
  classes: string = 'modal-lg';

  constructor(
    private sandbox: CommonSandbox) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
  }

  close() {
    this.sandbox.closeModal();
  }

}
