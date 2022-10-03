import {Component, Type} from '@angular/core';
import {NgComponentOutlet} from "@angular/common";
import {CustomModalComponent} from "./demos/part_7_content_projection/modal-projection.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgComponentOutlet, CustomModalComponent],
  template: `
      <div class="container m-5">
          <h1>Welcome to {{titleContent}}!</h1>
          <button (click)="loadModal()">load modal</button>
          <ng-container *ngComponentOutlet="modalComponent; 
                         content: contentNodes"></ng-container> 
      </div>
  `,
})
export class AppComponent {
  titleContent = 'view-workshop-ref';
  modalComponent: Type<any>;
  contentNodes = [[document.createTextNode('BOOOOO')], [document.createTextNode('MOOOOO')]];


  async loadModal() {
    const componentClass = await import('./demos/part_7_content_projection/modal-projection.component')
    this.modalComponent = componentClass.CustomModalComponent;
  }
}
