import './scss/styles.scss';
import { Products } from './components/base/Models/Products';
import { Buyer } from './components/base/Models/Buyer';
import { Basket } from './components/base/Models/Basket';
import { Communication } from './components/base/Models/Communication';
import { API_URL } from './utils/constants';

const apiModel = new Communication(API_URL);
const productsModel = new Products();
const buyerModel = new Buyer();
const basketModel = new Basket();

// тестирование класса Products
const products = await apiModel.getProductList();
productsModel.savedList(products.items); // сохранение товаров
const productObject = productsModel.getList(); // получение товаров
console.log(productObject);
console.log(productsModel.getProductId('c101ab44-ed99-4a54-990d-47aa2bb4e7d9')); // поиск товара по айди
productsModel.saveProduct(products.items[0]); // сохранение карточки товара
console.log(productsModel.getProduct()); // получение карточки товара

// тестирование класса Buyer
// предполагаемые данные покупателя
const BuyerInfo = { 
        payment: 'card',
        email: "",
        phone: "8956765",
        address: "yandex",
    }
buyerModel.saveData(BuyerInfo); // сохранение данных
console.log(buyerModel.getDataBuyer()); // получение данных
console.log(buyerModel.removeDataBuyer()); // очищение данных
buyerModel.saveData(BuyerInfo); // заново сохраняю данные
console.log(buyerModel.getDataBuyer()); // получение данных
console.log(buyerModel.validationData()); // валидация данных

// тестирование класса Basket
basketModel.addProductBasket(products.items[1]) // добавление товара в корзину
basketModel.addProductBasket(products.items[2])
basketModel.addProductBasket(products.items[3])
console.log(basketModel.getListProducts()) // получение списка товаров
basketModel.deleteProductBasket(products.items[1]) // удаление товара (мутирующий массив)
console.log(basketModel.getListProducts()) // получение списка товаров
console.log(basketModel.getAllMoneyBasket()) // получение общей суммы товаров
console.log(basketModel.getQuantityBasket()) // получение общего кол-ва товаров
console.log(basketModel.checkProductIdBasket("412bcf81-7e75-4e70-bdb9-d3c73c9803b7"))
console.log(basketModel.checkProductIdBasket("123"))
basketModel.removeBasket(); // очистка корзины
console.log(basketModel.getListProducts()) // получение списка товаров в корзине
