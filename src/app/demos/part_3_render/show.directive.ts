import {Directive, HostBinding, Input, OnChanges, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appShow]',
  standalone: true
})
export class ShowDirective implements OnChanges {
  @Input('appShow') visible: boolean;

  @HostBinding('hidden')
  hiddenValues = false;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['visible'].currentValue !== changes['visible'].previousValue) {
      this.hiddenValues = changes['visible'].currentValue;
    }
  }
}
