import {Directive, DoCheck, ElementRef, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appKlass]',
  standalone: true
})
export class KlassDirective implements DoCheck {
  @Input('appKlass') klassMap: Record<string, boolean>;

  constructor(private renderer: Renderer2,
              private hostElement: ElementRef) {}

  // OnChanges?
  ngDoCheck(): void {
    for(let [key, value] of Object.entries(this.klassMap)) {
      if(value) {
        this.renderer.addClass(this.hostElement.nativeElement, key);
      } else {
        this.renderer.removeClass(this.hostElement.nativeElement, key);
      }
    }
  }
}
