import {Directive, inject, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[tab]',
  standalone: true
})
export class TabSlotDirective {
  @Input('tab') id: any;

  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);

  toggleVisibility(state: boolean) {
    this.viewContainerRef.clear();

    if(state) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }
}
