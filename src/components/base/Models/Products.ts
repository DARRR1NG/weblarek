import { IProduct, IProductList } from "../../../types";
export class Products {
    chooseCard: IProduct;
    productsList: IProduct[] = [];

    // Cохранение массива товаров полученного в параметрах метода
    savedList(products: IProduct[]): void {
        this.productsList = products
    }
    // Получение массива товаров из модели
    getList(): IProduct[] {
        return this.productsList
    }

    // Получение одного товара по его id
    getProductId(id: string): IProduct {
        return this.productsList.find(item => item.id === id) || null;
    }

    // Сохранение товара для подробного отображения
    saveProduct(card: IProduct): void {
        this.chooseCard = card;
    }

    // Получение товара для подробного отображения
    getProduct(): IProduct {
        return this.chooseCard
    }
}