import {AfterViewInit, Component, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
      <div style="text-align:center" class="content">
          <h1>Welcome to {{titleContent}}!</h1>
      </div>
  `,
})
export class AppComponent implements AfterViewInit{
  titleContent = 'view-workshop-ref';

  constructor(private vcr: ViewContainerRef) {}

  ngAfterViewInit(): void {
    console.log(this.vcr.length);
  }
}
