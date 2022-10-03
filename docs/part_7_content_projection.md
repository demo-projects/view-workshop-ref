# Content Projection

- Explain the concept
- Explain OCP - Open Close Principle
- Explain slots

#### Refactor the modal component 
```html
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
```

- demo the usage with css selectors

```html
          <app-custom-modal>
              <div #header>whatever goes in header</div>
              <div class="text-primary">I goes in body</div>
              <div #footer>
                <button class="btn btn-lg btn-primary">FOOTER</button>                  
              </div>
          </app-custom-modal>
```

### DEMO: Passing content with dynamic rendering

```typescript
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
```

- component outlet delegates to create component (explore source)
- which mean that you can pass projected node via code too.

#### Demo: tabs feature with ng content
`demos/part_7/toggle`
