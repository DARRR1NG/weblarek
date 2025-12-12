import { Form, IForm } from "./Entity/Form";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";

export interface IContacts extends IForm {
    email: string;
    phone: string;
}

export class Contacts extends Form<IContacts> {
    protected emailInput: HTMLInputElement;
    protected phoneInput: HTMLInputElement;

    constructor(protected events: IEvents, container: HTMLElement) {
            super(events, container)
    
            this.emailInput = ensureElement<HTMLInputElement>('input[name="email"]', this.container);
            this.phoneInput = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);
    
            this.emailInput.addEventListener('input', () => {this.onInputChange('email', this.emailInput.value)} )
            this.phoneInput.addEventListener('input', () => {this.onInputChange('phone', this.phoneInput.value)} )
        }
    
        set email(value: string) {
            this.emailInput.value = value;
        }
    
        set phone(value: string) {
            this.phoneInput.value = value;
        }
}