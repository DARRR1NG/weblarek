import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form, IForm } from "./Entity/Form";
import { paymentType } from "../../types";

export interface IOrder extends IForm {
    payment: paymentType;
    address: string;
}

export class Order extends Form<IOrder> {
    protected moneyPayCash: HTMLButtonElement;
    protected moneyPayCard: HTMLButtonElement;
    protected addressInput: HTMLInputElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(events, container)

        this.moneyPayCash = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);
        this.moneyPayCard = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);
        this.addressInput = ensureElement<HTMLInputElement>('input[name="address"]', this.container);

        this.moneyPayCard.addEventListener('click', () => {this.onInputChange('payment', 'card')} )
        this.moneyPayCash.addEventListener('click', () => {this.onInputChange('payment', 'cash')} )
        this.addressInput.addEventListener('input', () => {this.onInputChange('address', this.addressInput.value)} )
    }

    set payment(value: paymentType) {
        this.moneyPayCard.classList.toggle('button_alt-active', value === 'card');
        this.moneyPayCash.classList.toggle('button_alt-active', value === 'cash');
    }

    set address(value: string) {
        this.addressInput.value = value;
    }
}