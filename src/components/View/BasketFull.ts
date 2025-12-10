import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";

interface IBasketFull {
    basketItems: HTMLElement[];
    total: number
}

export class BasketFull extends Component<IBasketFull> {
    basketList: HTMLElement;
    basketButton: HTMLButtonElement;
    basketPrice: HTMLElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container)
        this.basketList = ensureElement<HTMLElement>('.basket__list', this.container)
        this.basketButton = ensureElement<HTMLButtonElement>('.basket__button', this.container)
        this.basketPrice = ensureElement<HTMLElement>('.basket__price', this.container)
        this.basketButton.addEventListener('click', () => {this.events.emit('continue')})
    }

    set basketItems(cards: HTMLElement[]) {
        if (cards.length === 0) {
            const paragraph = document.createElement('span')
            paragraph.textContent = 'Корзина пуста';
            this.basketList.replaceChildren(paragraph)
            this.basketButton.disabled = true;
        } else {
            this.basketList.replaceChildren(...cards)
            this.basketButton.disabled = false;
        }
    }

    set total(value: number) {
        this.basketPrice.textContent = `${value} синапсов`
    }
}