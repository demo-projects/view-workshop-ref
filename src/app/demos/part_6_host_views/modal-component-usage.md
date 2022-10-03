```typescript
import {
  AfterViewInit,
  Component,
  ComponentRef,
  createComponent, createEnvironmentInjector,
  EnvironmentInjector,
  inject,
  OnInit,
  ViewContainerRef, ViewRef
} from '@angular/core';
import {Card, CardTypes} from "./demos/part_5_embedded_views/card_deck/cards-types";
import {CardDeckDirective} from "./demos/part_5_embedded_views/card_deck/card-deck.directive";
import {ModalComponent} from "./demo_components/modal.component";

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
          <div class="container m-5">
          <h1>Welcome to {{titleContent}}!</h1>
          <button class="btn btn-primary" (click)="open()">show</button>
      </div>
  `,
})
export class AppComponent implements OnInit  {
  titleContent = 'view-workshop-ref';

  viewContainer = inject(ViewContainerRef);
  envInjector = inject(EnvironmentInjector);

  private componentRef:ComponentRef<ModalComponent>;

  ngOnInit(): void {
    this.componentRef = createComponent<ModalComponent>(ModalComponent, {
      environmentInjector: this.envInjector
    })
  }

  open() {
    this.viewContainer.insert(this.componentRef.hostView);

    this.componentRef.instance.modalTitle = 'Dynamic Title For Modal';

    this.componentRef.instance.onClose.subscribe(() => {
      // Detach won't destroy the component 
      this.viewContainer.detach();
    })
  }
}

```
