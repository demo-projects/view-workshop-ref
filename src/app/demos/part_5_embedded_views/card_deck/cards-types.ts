export enum CardTypes {
  Plain = 'Plain',
  Primary = 'Primary'
}

export interface Card {
  type: CardTypes,
  header?: string;
  title?: string;
  text?: string;
  smallText?: string;
}

export interface CardContext {
  $implicit: Card;
}
