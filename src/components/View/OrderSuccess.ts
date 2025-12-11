import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export interface IOrderSuccess {
    finalTotal: number
}

export class OrderSuccess extends Component<IOrderSuccess> {
    protected description: HTMLElement;
    protected continueShopping: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container)

        this.description = ensureElement<HTMLElement>('.order-success__description', this.container);
        this.continueShopping = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

        this.continueShopping.addEventListener('click', () => {this.events.emit('ready:close')})
    }

    set finalTotal(value: number) {
        this.description.textContent = `Списано ${value} синапсов`
    }
}