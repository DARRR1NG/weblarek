import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IModal {
    content: HTMLElement
}

export class Modal extends Component<IModal> {
    protected modalButton: HTMLButtonElement;
    protected modalContent: HTMLElement

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container)
        this.modalButton = ensureElement<HTMLButtonElement>('.modal__close', this.container)
        this.modalContent = ensureElement<HTMLElement>('.modal__content', this.container)

        this.modalButton.addEventListener('click', () => {
            this.close()
        })

        this.modalButton.addEventListener('click', this.close.bind(this));
        this.container.addEventListener('click', this.close.bind(this));
        this.modalContent.addEventListener('click', (event) =>
            event.stopPropagation()
        );
    }

    open() {
        this.container.classList.add('modal_active')
    }

    close() {
        this.container.classList.remove('modal_active')
    }

    set content(items: HTMLElement) {
        this.modalContent.replaceChildren(items)
    }
}