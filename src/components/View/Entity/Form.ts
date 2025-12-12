import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";

export interface IForm {fault: string}

export class Form<T extends IForm> extends Component<T> {
    protected formButton: HTMLButtonElement;
    protected faults: HTMLElement

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container)

        this.formButton = ensureElement<HTMLButtonElement>('.modal__actions button', this.container);
        this.faults = ensureElement<HTMLElement>('.form__errors', this.container)

        this.container.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            this.events.emit(`${this.container.getAttribute('name')}:click`)} 
        )
    }

    set fault(value: string) {
        this.faults.textContent = value;
    }

    set buttonState(value: boolean) {
        this.formButton.disabled = value;
    }

    protected onInputChange(field: keyof T, value: string) {
        this.events.emit('form:change', { field, value});
    }
}