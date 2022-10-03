import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[nkWindow]',
  exportAs: 'portal',
  standalone: true
})
export class WindowDirective {
  private readonly _element: HTMLElement;
  private readonly _parent: HTMLElement | null;
  private _window: Window | null;

  constructor(private hostElement: ElementRef) {
    this._element = hostElement.nativeElement;
    this._parent = this._element.parentElement;
  }

  open(){
    this._window = window.open('','','width=422, height=256');
    this._window?.document.body.appendChild(this._element);
  }

  close() {
    this._parent?.appendChild(this._element);
    this._window?.close();
  }
}
