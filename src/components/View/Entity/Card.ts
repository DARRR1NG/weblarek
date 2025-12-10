import { Component } from "../../base/Component";
import { ensureElement } from "../../../utils/utils";
import { IProduct } from "../../../types";

export interface ICard extends Partial<IProduct> {
    index?: number;
}

export abstract class Card<T extends ICard> extends Component<T> {
    protected priceElement: HTMLElement;
    protected titleElement: HTMLElement;
    protected cardId?: string;

    constructor(container: HTMLElement) {
        super(container)
        this.priceElement = ensureElement<HTMLElement> ('.card__price', this.container);
        this.titleElement = ensureElement<HTMLImageElement> ('.card__title', this.container);
    }

    set id(value: string) {
        this.cardId = value;
        }

    set price(value: number | null) {
            if (value === null) {
                this.priceElement.textContent = 'Бесценно';
            } else {
                this.priceElement.textContent = `${value} синапсов`;
            }
        }
    
    set title(value: string) {
            this.titleElement.textContent = value;
        }
}