import {Directive, DoCheck, Input, TemplateRef, ViewContainerRef} from "@angular/core";

@Directive({
  selector: '[nkForMap]',
  standalone: true
})
export class ForMapDirective implements DoCheck {
  @Input('nkForMapIn') map: Record<any, any>;

  constructor(private viewContainer: ViewContainerRef,
              private template: TemplateRef<any>) {
  }

  ngDoCheck(): void {
    this.viewContainer.clear();

    Object.keys(this.map).forEach(key => {
      this.viewContainer.createEmbeddedView(
          this.template,
          {$implicit: {key: key, value: this.map[key]}}
      )
    })
  }
}

