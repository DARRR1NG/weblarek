import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Card } from "./Entity/Card";

export class CardBasket extends Card<IProduct> {
    protected cardButton: HTMLButtonElement;
    protected index: HTMLElement

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container)
        this.cardButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container)
        this.index = ensureElement<HTMLElement>('.basket__item-index', this.container)

        this.cardButton.addEventListener('click', () => {this.events.emit('card:remove', {cardId: this.cardId})})
    }

    set indexCard(value: number) {
        this.index.textContent = `${value}`
    }
}