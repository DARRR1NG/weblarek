import { IProduct } from "../../../types";

export class Basket {
    payList: IProduct[] = [];

    // Получение массива товаров, которые находятся в корзине
    getListProducts(): IProduct[] {
        return this.payList
    }
    // Добавление товара, который был получен в параметре, в массив корзины
    addProductBasket(item: IProduct): void {
        this.payList.push(item);
    }
    // Удаление товара, полученного в параметре из массива корзины
    deleteProductBasket(item: IProduct): void {
        const findIndexProduct = this.payList.indexOf(item);
        this.payList.splice(findIndexProduct, 1);
        }
    // Очистка корзины;
    removeBasket(): IProduct[] {
        return this.payList = [];
    }
    // Получение стоимости всех товаров в корзине
    getAllMoneyBasket(): number {
        let allMoney: number = 0;
        this.payList.forEach(element => {
            if (element.price != null) {
                allMoney += element.price
            } else {allMoney += 0}
        });
        return allMoney
    }
    // Получение количества товаров в корзине
    getQuantityBasket(): number {
        let allQuantity: number = 0;
        this.payList.forEach(() => {
            allQuantity += 1
        });
        return allQuantity
    }
    // Проверка наличия товара в корзине по его id, полученного в параметре метода
    checkProductIdBasket(id: string): boolean {
        return this.payList.some(item => item.id === id)
    }
}