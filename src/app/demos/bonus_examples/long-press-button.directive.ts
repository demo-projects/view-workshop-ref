import {Directive, EventEmitter, HostListener, Output} from "@angular/core";

// DEMO: Event modifier
@Directive({
  selector: '[click.long]',
  standalone: true
})
export class LongClickDirective {
  private _clickTimer: number;

  @Output('click.long')
  longClickEvent = new EventEmitter();

  @HostListener('mousedown')
  onMouseDown() {
    this._clickTimer = window.setTimeout(
        () => this.longClickEvent.emit(),
        2000
    )
  }

  @HostListener('mouseup')
  cancelTimer() {
    clearTimeout(this._clickTimer)
  }
}
