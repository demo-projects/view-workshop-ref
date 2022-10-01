# Embedded Views

- Let's first understanding the `template` tag
- Explain Shadow DOM.
- In App Component create a `<template>` tag

__app.component.ts__

```html
<template>
    <h2>I will not render!</h2>
</template>
```
- Let's practice the vanilla JS template 
- Create template, query it, clone it, attach it

```typescript
@Component({
  selector: 'app-root',
  standalone: true,
  template: `
      <div style="text-align:center" class="content">
          <h1>Welcome to {{titleContent}}!</h1>
          <button (click)="showTemplate()"> show template </button>
          <template id="template">
              <h2>I will not render!</h2>
          </template>
      </div>
  `,
})
export class AppComponent implements OnInit{
  titleContent = 'view-workshop-ref';

  template: HTMLTemplateElement | null;
  host: HTMLElement | null;

  ngOnInit(): void {
    this.template = document.getElementById('template') as HTMLTemplateElement;
    this.host = document.getElementsByTagName('h1')[0];
  }

  showTemplate() {
    const clone = this.template?.content.cloneNode(true);
    if(clone) {
      this.host?.appendChild(clone);
    }
  }
}
```

### Simplify with NgIf

```typescript
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf],
  template: `
      <div style="text-align:center" class="content">
          <h1>Welcome to {{titleContent}}!</h1> 
          <ng-template [ngIf]="flag">
              <h2>I will not render!</h2>
          </ng-template>
      </div>
  `,
})
export class AppComponent implements AfterViewInit{
  titleContent = 'view-workshop-ref';
  flag = false;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.flag = true;
    }, 2000)
  }
}
```

### Lab 2_1 Notes
- inspect the created `View` object n devtool

```typescript
export class AppComponent implements AfterViewInit{
  titleContent = 'view-workshop-ref';
  @ViewChild(TemplateRef) template: TemplateRef<any>;

  ngAfterViewInit(): void {
    const view: ViewRef = this.template.createEmbeddedView({});
    console.log(view);
  }
```
- insert a View "manually"

```typescript
ngAfterViewInit(): void {
  const view: ViewRef = this.template.createEmbeddedView({});
  this.viewContainer.insert(view);
  console.log(this.viewContainer.length);
}
```

### Demo: Template Context

```typescript
@Component({
  selector: 'app-root',
  standalone: true,
  template: `
      <div style="text-align:center" class="content">
          <h1>Welcome to {{titleContent}}!</h1>
          <ng-container #container></ng-container>  
          <ng-template let-text let-textColor=color>
              <h2>{{ text }} in {{textColor}} color</h2>
          </ng-template>

      </div>
  `,
})
export class AppComponent implements OnInit{
  titleContent = 'view-workshop-ref';

  @ViewChild(TemplateRef, {static: true}) titleTemplate: TemplateRef<any>;
  @ViewChild('container', {read: ViewContainerRef, static: true}) viewContainer: ViewContainerRef;

  ngOnInit(): void {
    this.viewContainer.createEmbeddedView(this.titleTemplate, {
      $implicit: 'The content of the title',
      color: 'red'
    })
  }
}
```

- create an interface for this view context
- 
```typescript
interface ViewContext {
  $implicit: string;
  color: string;
}
```

### Demo: NgFor with Micro Syntax

- find it under: `forMap` directive

```html
<ul>
    <li *nkForMap="let prop in person">
        {{ prop.key }}: {{ prop.value }}
    </li>
</ul>
```

### Demo: The card deck

- install bootstrap for best results
- Ref files can be found under `card_deck` directory


