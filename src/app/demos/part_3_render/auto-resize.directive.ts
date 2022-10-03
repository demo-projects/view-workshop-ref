import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: 'textarea',
  standalone: true
})
export class AutoResizeDirective {
  private readonly _textArea: HTMLTextAreaElement;

  constructor(private hostElement: ElementRef) {
    this._textArea = hostElement.nativeElement;
  }
  @HostBinding('style')
  defaultStyle = {overflow: 'hidden', height: 'auto', resize: 'none'};

  @HostListener('input')
  autoExpand() {
    this._textArea.style.height = 'inherit';  // Reset textArea height
    const computed = window.getComputedStyle(this._textArea); // Get the computed styles

    // Calculate the height
    const height = parseInt(computed.getPropertyValue('border-top-width'), 10)
        + parseInt(computed.getPropertyValue('padding-top'), 10)
        + this._textArea.scrollHeight
        + parseInt(computed.getPropertyValue('padding-bottom'), 10)
        + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

    this._textArea.style.height = height + 'px';
  }
}
