# Part 2: View Query

### DEMO View Query
- There are varius options for view query
- We will explore each one of them
- Each one has it's own use-cases
- Mastering the view queries is essential

#### Referring DOM Element

- Let's cleanup `AppComponent` leaving only the `<h1>` title

__AppComponent__
```typescript
@Component({
  selector: 'app-root',
  template: `
      <div style="text-align:center" class="content">
          <h1>Welcome to {{titleContent}}!</h1>
      </div>
  `,
})
export class AppComponent {
  titleContent = 'view-workshop-ref';
}
```

- query the title and implement `AfterViewInit` to log it 
- use id tag on the h1 tag
- the results will be as expected - with the dynamic value in place

```typescript
@Component({
  selector: 'app-root',
  template: `
      <div style="text-align:center" class="content">
          <h1 #titleElement>Welcome to {{titleContent}}!</h1>
      </div>
  `,
})
export class AppComponent implements AfterViewInit{
  @ViewChild('titleElement') title: ElementRef;

  titleContent = 'view-workshop-ref';

  ngAfterViewInit(): void {
    console.log(this.title);
    console.log(this.title.nativeElement);
  }
}
```
- why is it not accessible in `OnInit` life cycle method? 
- Because be default - the query resolved after change detection runs.
- The reason: change detection might effect it. 
- If you need to access on early stage? before CD? use 'static'

```typescript
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('titleElement', {static: true}) title: ElementRef;

  titleContent = 'view-workshop-ref';

  ngOnInit(): void {
    console.log({onInit: this.title.nativeElement});
  }

  ngAfterViewInit(): void {
    console.log({afterViewInit: this.title.nativeElement});
  }
}
```

- to visualize the differences, add `innerHTML` log

```typescript
  ngOnInit(): void {
    console.log({onInit: this.title.nativeElement.innerHTML});
  }

  ngAfterViewInit(): void {
    console.log({afterViewInit: this.title.nativeElement.innerHTML});
  }
```

- template ref is not have to be unique
- we can query multiple elements to a `QueryList`
- 
```typescript
@Component({
  selector: 'app-root',
  template: `
      <div style="text-align:center" class="content">
          <h1 #titleElement>Welcome to {{titleContent}}!</h1>
          <h1 #titleElement>Welcome to {{titleContent}}!</h1>
          <h1 #titleElement>Welcome to {{titleContent}}!</h1>
      </div>
  `,
})
export class AppComponent implements AfterViewInit {
  @ViewChildren('titleElement') title: QueryList<ElementRef>;

  titleContent = 'view-workshop-ref';

  ngAfterViewInit(): void {
    console.log({afterViewInit: this.title});
  }
}
```

#### Referring Components

- component can get queried with template tag
- an instance of the component class is returned
- to get access to th generate DOM element - we use the read property

```typescript
`<app-child #childComponent [counter]="42"></app-child>`
@ViewChild('childComponent') childComponent: ChildComponent;

@ViewChild(ChildComponent, {read: ElementRef}) childComponentElement: ElementRef;
@ViewChild(ChildComponent) childComponentInstance: ElementRef;
```

- Let's create a `service` and a `directive`

__app.service.ts__
```typescript
@Injectable({providedIn: 'root'})
export class AppService {

  constructor() {
    console.log('AppService instance');
  }
}
```

__target.directive.ts__
```typescript
@Directive({ selector: '[appTarget]'})
export class TargetDirective {
  constructor() {
    console.log('TargetDirective instance');
  }
}
```

- we can query the `directive` on the component
- and read the 'component' from it if needed
- or extract the `element`

```typescript
@ViewChild(TargetDirective) childComponentWithDirective: TargetDirective;
@ViewChild(TargetDirective, {read: ChildComponent}) childComponentWithDirectiveInstance: ChildComponent;
@ViewChild(TargetDirective, {read: ElementRef}) childComponentWithDirectiveElement: ElementRef;
```

- if the component provide a service - we can query it.
- 
```typescript
@Component({
  selector: 'app-child',
  template: `
    <p>child works!</p>
    <p>passed value is: {{ counter }}</p>
  `,
  providers: [AppService]
})
```

_in app.component.ts__
```typescript
  @ViewChild(AppService) childComponentWithService: AppService
```

- we can query bt service instance if it sits on the directive

__full example__
```typescript
@Component({
  selector: 'app-root',
  template: `
      <div style="text-align:center" class="content">
          <h1>Welcome to {{titleContent}}!</h1>
          <app-child appTarget #childComponent [counter]="42"></app-child>
      </div>
  `,
})
export class AppComponent implements AfterViewInit {
  titleContent = 'view-workshop-ref';

  // service on a directive on a component
  @ViewChild(AppService) childComponentDirectiveService: AppService
  @ViewChild(AppService, {read: TargetDirective}) childComponentDirective: TargetDirective
  @ViewChild(AppService, {read: ChildComponent}) childComponentInstance: ChildComponent
  @ViewChild(AppService, {read: ElementRef}) childComponentElement: ElementRef

  ngAfterViewInit(): void {
    console.log(this.childComponentDirectiveService);
    console.log(this.childComponentDirective);
    console.log(this.childComponentInstance);
    console.log(this.childComponentElement);
  }
}
```

