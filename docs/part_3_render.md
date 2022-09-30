# Part 3: The Renderer 
- let's switch to standalone modde

__main.ts__
```typescript
import {AppComponent} from "./app/app.component";

bootstrapApplication(AppComponent)
  .catch(err => console.error(err));
```

- the Renderer2 is the right API for manipulation.
- in this section we will deal with property manipulation
- we can configure directives to be standalone

__angular.json__
```json
"@schematics/angular:directive": {
          "skipTests": true,
          "flat": true,
          "standalone": true
        },
```

### Renderer in Action

- we will start with a simple implementation of `ngClass` (without diff optimizations)

```typescript
import {Component} from '@angular/core';
import {KlassDirective} from "./demo_direcitives/klass.directive";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [KlassDirective],
  template: `
      <div style="text-align:center" class="content">
          <h1 [appKlass]="styles">Welcome to {{titleContent}}!</h1>
          <button (click)="toggle()">toggle</button>
      </div>
  `,
  styles: [`
   .danger { color: red}
   .primary {color: blue}
  `],
})
export class AppComponent {
  titleContent = 'view-workshop-ref';
  

  styles = {
    'danger': true
  }

  toggle() {
    this.styles = {danger: false}
  }
}
```

- next - let's implement `ShowDIrective` with `HostBinding` to reduce code.
 
- directive selector can be an `element` - let's implement autoResizeTextArea

- Let's put it all together. can you build `NgModel`?


### DOM Manipulation


