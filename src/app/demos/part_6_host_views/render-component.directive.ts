import {
  ComponentRef,
  createComponent,
  Directive,
  EnvironmentInjector,
  Input,
  OnInit,
  ViewContainerRef
} from '@angular/core';

@Directive({
  selector: '[renderComponent]',
  standalone: true
})
export class RenderComponentDirective<T> implements OnInit {
  @Input('renderComponent') componentToRender: any;
  @Input('renderComponentWithContext') context: Record<string, any>;


  constructor(private vsc: ViewContainerRef,
              private injector: EnvironmentInjector) {}

  ngOnInit(): void {
    const componentViewRef: ComponentRef<any> = createComponent(this.componentToRender, {environmentInjector: this.injector});
    this.vsc.insert(componentViewRef.hostView);

    for(const key in this.context) {
      componentViewRef.instance[key] = this.context[key];
    }
  }
}
