import { IProduct } from "../../types";
import { EventEmitter, IEvents } from "../base/Events";
export class Products {
    chooseCard: IProduct | null = null;
    productsList: IProduct[] = [];

    constructor(protected events: IEvents) {

    }
    // Cохранение массива товаров полученного в параметрах метода
    savedList(products: IProduct[]): void {
        this.productsList = products
        this.events.emit('change:catalog')
    }
    // Получение массива товаров из модели
    getList(): IProduct[] {
        return this.productsList
    }

    // Получение одного товара по его id
    getProductId(id: string): IProduct | undefined {
        return this.productsList.find(item => item.id === id);
    }

    // Сохранение товара для подробного отображения
    saveProduct(card: IProduct): void {
        this.chooseCard = card;
        this.events.emit('cardModal:open')
    }

    // Получение товара для подробного отображения
    getProduct(): IProduct | null {
        return this.chooseCard
    }
}