import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Card } from "./Entity/Card";
import { categoryMap, CDN_URL } from "../../utils/constants";
import { CategoryKey } from "./CardCatalog";

export class CardFull extends Card<IProduct> {
    protected cardImage: HTMLImageElement;
    protected cardButton: HTMLButtonElement;
    protected cardCategory: HTMLElement;
    protected cardDescription: HTMLElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container)
        this.cardImage = ensureElement<HTMLImageElement>('.card__image', this.container)
        this.cardButton = ensureElement<HTMLButtonElement>('.card__button', this.container)
        this.cardCategory = ensureElement<HTMLElement>('.card__category', this.container)
        this.cardDescription = ensureElement<HTMLElement>('.card__text', this.container)

        this.cardButton.addEventListener('click', () => {this.events.emit('buy:products')} )
    }

    set category(value: string) {
            this.cardCategory.textContent = value;
    
            for (const key in categoryMap) {
                this.cardCategory.classList.toggle(
                    categoryMap[key as CategoryKey],
                    key === value
                )
            }
        }
    
    set image(value: string) {
        this.cardImage.src = `${CDN_URL}/${value}`;
        this.cardImage.alt = this.title;
    }

    set description(value: string) {
        this.cardDescription.textContent = value;
    }

    set button(value: string) {
        this.cardButton.textContent = value;
        this.cardButton.disabled = false;
        if (value === 'Недоступно') {
            this.cardButton.disabled = true;
        }
    }
}