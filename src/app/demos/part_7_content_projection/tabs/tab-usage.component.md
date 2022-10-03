```html

<tabs [selectedTabId]="selectedSlot">
    <div *tab="1">Hello slot 1!</div>
    <div *tab="2">Hello slot 2!</div>
    <div *tab="3">Hello slot 3!</div>
</tabs>

<input type="text" (keydown.enter)="selectTab($event)">

```

