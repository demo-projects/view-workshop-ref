import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective {
  @Input("appTooltip") tooltipTitle: string;
  private tooltip: HTMLElement;

  constructor(private hostElement: ElementRef,
              private renderer: Renderer2) {}

  @HostListener("mouseover") onMouseEnter() {
    this.showTooltip();
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.hideTooltip();
  }

  showTooltip() {
    this.tooltip = this.renderer.createElement('span');
    this.tooltip.appendChild(this.renderer.createElement("span"));

    this.renderer.appendChild(
        this.tooltip,
        this.renderer.createText(this.tooltipTitle)
    );

    const hostElementPosition = this.hostElement.nativeElement.getBoundingClientRect();

    let top = hostElementPosition.bottom;
    let left = hostElementPosition.left + hostElementPosition.width / 2;

    this.setStyle({
      "position": "absolute",
      "top": `${top}px`,
      "left": `${left}px`,
      "max-width": "90%",
      "font-size": "14px",
      "text-align": "center",
      "color": "#f8f8f2",
      "padding": "5px",
      "background": "#1e1e1f",
      "z-index": "1000",
    })

    this.renderer.appendChild(document.body, this.tooltip);
  }

  hideTooltip() {
    this.renderer.removeChild(document.body, this.tooltip);
  }

  private setStyle(styleMap: Record<string, string>) {
    for (const [key, value] of Object.entries(styleMap)) {
      this.renderer.setStyle(this.tooltip, key, value);
    }
  }
}
