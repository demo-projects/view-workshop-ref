# Host Views

- discuss stateful vs stateless
- When to use Embedded vs Host

### Demo: Dynamic Component Creation

#### Create stateful component

`demo_components/modal.component.ts`

#### Render using ViewContainer

__app.component.ts__
`modal-component-usage.md`

#### Initialize component instance properties
```typescript
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
export class AppComponent {
  titleContent = 'view-workshop-ref';
  viewContainer = inject(ViewContainerRef);

  open() {
    this.viewContainer.createComponent(ModalComponent);
  }
}
```
#### __1 create component function ref and pass injector__

- Listen to component events
- let's add few steps to understand what's going on:

```typescript
private componentRef:ComponentRef<ModalComponent>;

envInjector = inject(EnvironmentInjector);

ngOnInit(): void {
this.componentRef = createComponent<ModalComponent>(ModalComponent, {
  environmentInjector: this.injector
})
}
```
#### __2__use the component instance
```typescript
// in service move initalize to ctor
constructor() {
  this.onSave = new EventEmitter<string>();
  this.onClose = new EventEmitter<any>();
}
```

#### __3__to show it: insert the component hostView into the view container
```typescript
viewContainer = inject(ViewContainerRef);

ngOnInit() {
  this.componentRef.instance.onClose.subscribe(() => {
    this.viewContainer.clear();
  })
}
```

#### Implement component render directive with props
`render-component.directive.ts`

- don't forget to add a callback input to the directive
- look for usage.md


#### Lazy Load dynamic component
```typescript
export class AppComponent {
  titleContent = 'view-workshop-ref';

  viewContainer = inject(ViewContainerRef);
  injector = inject(EnvironmentInjector);
  
  async loadModal() {
    const componentClass = await import('./demo_direcitives/part_6_host_views/modal.component')
    const componentRef = createComponent(componentClass.ModalComponent, {environmentInjector: this.injector});
    this.viewContainer.insert(componentRef.hostView);
  }
}
```

#### explore the built in directives

```typescript
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgComponentOutlet],
  template: `
      <div class="container m-5">
          <h1>Welcome to {{titleContent}}!</h1>
          <button (click)="loadModal()">load modal</button>
          <ng-container *ngComponentOutlet="modalComponent" ></ng-container>
      </div>
  `,
})
export class AppComponent {
  titleContent = 'view-workshop-ref';
  modalComponent: Type<any>;

  async loadModal() {
    const componentClass = await import('./demo_direcitives/part_6_host_views/modal.component')
    this.modalComponent = componentClass.ModalComponent;
  }
}
```



