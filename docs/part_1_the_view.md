### Demo : New Project setup
- set the prefix
- disable unit tests
- generate flat components
- ts.config: "strictPropertyInitialization": false,
- optional: install milligram css: `npm i milligram`
  - `@import "~milligram/dist/milligram.css";`


# Part 1: The View

### Demo : Explore the view
- Inject and log `ViewContainerRef` object
- Explain the Tview, and Lview convention

```typescript
class AppComponent {
  constructor(private vcr: ViewContainerRef) {}

  ngOnInit(): void {
    console.log(this.vcr);
  }
}
```

### Explain the relationship between the Logical tree and the DOM
Use the whiteboard to explain why the logical tree doesn't have
to be similar to the resulting DOM

### Demo : DOM vs Angular View

- create a child component named `ChildComponent`

```typescript
import {Component, DoCheck, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <p>child works!</p>
    <p>passed value is: {{ counter }}</p>
  `,
})
export class ChildComponent implements DoCheck {
  @Input() counter: number;

  ngDoCheck(): void {
    console.log(`ChildComponent checked. passed value is: ${this.counter}`);
  }
}
```

- refactor and use in `AppComponent`

```typescript
import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
      <div style="text-align:center" class="content">
          <h1>Welcome to {{title}}!</h1>
          <button (click)="increaseCounter()">increase counter</button>
          <app-child [counter]="counter"></app-child>
      </div>
  `,
})
export class AppComponent  {
  title = 'view-workshop-ref';
  counter: number = 0;

  increaseCounter() {
    this.counter += 1;
  }
}
```

- open devtool, run and explain
- inspect the DOM element and locate the app-child tag
- enable paint flashing and explain incremental updates
- with vanilla JS - remove the element from the dom

```typescript
  document.getElementsByTagName('app-child')[0].remove();
```

- close the devtool before proceed.
- inspect the element to show that is gone from the DOM
- press the button to demonstrate that the logical tree is active
