import {Component, DoCheck, Input } from '@angular/core';
import {AppService} from "./app.service";

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
