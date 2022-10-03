```typescript
import {Component} from '@angular/core';
import {ModalComponent} from "./demos/part_6_host_views/modal.component";
import {RenderComponentDirective} from "./demos/part_6_host_views/render-component.directive";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RenderComponentDirective],
  template: `
      <div class="container m-5">
          <h1>Welcome to {{titleContent}}!</h1>
          <button class="btn btn-primary" (click)="open()">show</button>

          <ng-container *renderComponent="modalComponent; withContext context "></ng-container>
      </div>
  `,
})
export class AppComponent {
  modalComponent = ModalComponent;
  context = {
    modalTitle: 'Hello Component!!!',
    onCloseHandler: () => alert(99)
  }
  
  titleContent = 'view-workshop-ref';
}

```
