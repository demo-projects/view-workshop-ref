# View Containers

- inject `ViewContainerRef` to `AppComponent` to explore it
- 
```typescript
export class AppComponent implements AfterViewInit{
  titleContent = 'view-workshop-ref';

  constructor(private vcr: ViewContainerRef) {}

  ngAfterViewInit(): void {
    console.log(this.vcr);
  }
}
```

- log the `vcr.element` what is it? (the "parent" element)

```typescript
console.log(this.vcr.element);
```

- we can also get reference to the `node injector`

```typescript
console.log(this.vcr.injector);
```
- note that the length of this view container is 0
- we need to implicitly attach view containers to this view container
- We can treat any anchor element as a `viewContainer` with a `ViewQuery`

```typescript
@ViewChild('any-anchor', {read: ViewContainerRef})
```
- once we hold a reference to a view container, we can manage views as a group.
- we can create `EmbeddedViews` or `HostViews` (Components)
- an anchor element can have only one `ViewContainer` 
- Explore `ViewContainer` API

