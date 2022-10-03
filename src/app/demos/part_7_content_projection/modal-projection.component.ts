import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-custom-modal',
  standalone: true,
  template: `
      <div class="modal" tabindex="-1" style="display: block">
          <div class="modal-dialog">
              <div class="modal-content">
                  <div class="modal-header">
                      <ng-content select="#header"></ng-content>
                  </div>
                  <div class="modal-body">
                      <p>{{ modalTitle }}</p>
                      <div class="mb-3">
                          <ng-content></ng-content>
                      </div>
                  </div>
                  <div class="modal-footer">
                      <ng-content select="#footer"></ng-content>
                  </div>
              </div>
          </div>
      </div>
  `,
  styles: []
})
export class CustomModalComponent  {
  @Input() modalTitle: string;
  @Input() modalBody: string;
  @Input() onCloseHandler: Function;

  @Output() onClose: EventEmitter<any>;
  @Output() onSave: EventEmitter<string>;

  selection: any;

  constructor() {
    this.onSave = new EventEmitter<string>();
    this.onClose = new EventEmitter<any>();
  }

  handleSelection($event: any) {
    this.selection = $event.currentTarget.value
  }

  closeModal() {
    // this.onClose.emit();
    this.onCloseHandler();
  }

  saveAndClose() {
    this.onSave.emit(this.selection);
  }
}
