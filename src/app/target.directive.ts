import {Directive} from '@angular/core';
import {AppService} from "./app.service";

@Directive({
  selector: '[appTarget]',
  providers: [AppService]
})
export class TargetDirective {
  constructor() {
    console.log('TargetDirective instance');
  }
}
