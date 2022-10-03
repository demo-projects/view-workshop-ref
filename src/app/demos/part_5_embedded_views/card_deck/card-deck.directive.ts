import {
  ComponentRef, createComponent,
  Directive,
  ElementRef, EnvironmentInjector,
  Injector,
  Input,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { Card, CardContext, CardTypes } from "./cards-types";
import { CardsComponent } from "./cards-templates.component";

@Directive({
  selector: '[cardDeck]',
  standalone: true
})
export class CardDeckDirective implements OnInit {
  @Input('cardDeckFor') cards: Card[];
  @Input('cardDeckPrimary') primaryTemplate: TemplateRef<CardContext>;
  @Input('cardDeckPlain') plainTemplate: TemplateRef<CardContext>;

  constructor(
      private injector: EnvironmentInjector,
      private vcr: ViewContainerRef,
      private renderer: Renderer2,
      private hostElement: ElementRef
  ) {
  }

  ngOnInit(): void {
    const parentNode = this.renderer.parentNode(this.hostElement.nativeElement);
    const wrapper = this.renderer.createElement('div');

    this.renderer.addClass(wrapper, 'card-deck');
    this.renderer.insertBefore(parentNode, wrapper, this.hostElement.nativeElement);
    this.renderer.removeChild(parentNode, this.hostElement.nativeElement);
    this.renderer.appendChild(wrapper, this.hostElement.nativeElement);

    const cardsComponent: ComponentRef<CardsComponent> = createComponent(CardsComponent, {environmentInjector: this.injector})

    this.cards.forEach(card => {
      this.renderTemplate(card, cardsComponent.instance)
    })
  }

  private renderTemplate(card: Card, component: CardsComponent) {
    switch (card.type) {
      case CardTypes.Plain:
        this.vcr.createEmbeddedView(this.plainTemplate || component.plainCardTemplate, {$implicit: card});
        break
      case CardTypes.Primary:
        this.vcr.createEmbeddedView(this.primaryTemplate || component.primaryCardTemplate, {$implicit: card});
        break;
    }
  }
}
