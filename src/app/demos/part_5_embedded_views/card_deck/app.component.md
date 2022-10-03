```typescript
import {Component} from '@angular/core';
import {Card, CardTypes} from "./cards/cards.types";

@Component({
  selector: 'app-root',
  template: `
      <div class="container m-5">
          
          <ng-container *cardDeck="let card for cards; primary customPrimary"></ng-container>
          
          <ng-template #customPrimary let-card>
              <h5>bla bla bla</h5>
          </ng-template>
        
      </div>`,
})
export class AppComponent {
  cards: Card[] = [
    {
      type: CardTypes.Plain,
      title: "The title",
      text: "The Text"
    },
    {
      type: CardTypes.Plain,
      title: "Another title",
      text: "another text to render"
    },
    {
      type: CardTypes.Primary,
      title: "What else",
      text: "The Text The Text The Text",
      header: 'Im The header',
      smallText: 'and some small text'
    },

  ]
}

```
