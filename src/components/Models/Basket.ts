import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Basket {
    payList: IProduct[] = [];

    constructor(protected events: IEvents) { }

    // Получение массива товаров, которые находятся в корзине
    getListProducts(): IProduct[] {
        return this.payList
    }
    // Добавление товара, который был получен в параметре, в массив корзины
    addProductBasket(item: IProduct): void {
        this.payList.push(item);
        this.events.emit('basket:change')
    }
    // Удаление товара, полученного в параметре из массива корзины
    deleteProductBasket(item: IProduct): void {
        const findIndexProduct = this.payList.indexOf(item);
        this.payList.splice(findIndexProduct, 1);
        this.events.emit('basket:change')
        }
    // Очистка корзины
    removeBasket(): IProduct[] {
        return this.payList = [];
    }
    // Получение стоимости всех товаров в корзине
    getAllMoneyBasket(): number {
    return this. payList.reduce((total, item) => total + (item.price || 0), 0);
    }
    // Получение количества товаров в корзине
    getQuantityBasket(): number {
        return this.payList.length
    }
    // Проверка наличия товара в корзине по его id, полученного в параметре метода
    checkProductIdBasket(id: string): boolean {
        return this.payList.some(item => item.id === id)
    }
}