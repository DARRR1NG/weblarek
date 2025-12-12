import { IProduct } from "../../types";
import { categoryMap } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Card } from "./Entity/Card";
import { CDN_URL } from "../../utils/constants";
import { IEvents } from "../base/Events";

export type CategoryKey = keyof typeof categoryMap;

export interface ICardActions {
    onClick: () => void
}

export type TCardCatalog = Pick<IProduct, 'image' | 'category'>

export class CardCatalog extends Card<IProduct> {
    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);
        this.categoryElement = ensureElement<HTMLElement>(
            '.card__category',
            this.container
        );

        this.imageElement = ensureElement<HTMLImageElement>(
            '.card__image',
            this.container
        );
        this.container.addEventListener('click', () => {this.events.emit('card:open', {cardId: this.cardId})})
    }

    set category(value: string) {
        this.categoryElement.textContent = value;

        for (const key in categoryMap) {
            this.categoryElement.classList.toggle(
                categoryMap[key as CategoryKey],
                key === value
            )
        }
    }

    set image(value: string) {
        const imageItem = `${CDN_URL}/${value}`;
        this.setImage(this.imageElement, imageItem, this.title)
    }
}