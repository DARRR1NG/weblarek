import './scss/styles.scss';
import { Products } from './components/Models/Products';
import { Buyer } from './components/Models/Buyer';
import { Basket } from './components/Models/Basket';
import { Communication } from './components/Models/Communication';
import { API_URL } from './utils/constants';
import { IBuyer, IOrderResponse } from './types';
import { apiProducts } from './utils/data';

const apiModel = new Communication(API_URL);
const productsModel = new Products();
const buyerModel = new Buyer();
const basketModel = new Basket();

// сохранение данных с сервера
const products = apiProducts;
const data: IOrderResponse = {
  payment: "card",
  email: "test@test.ru",
  phone: "+71234567890",
  address: "Spb Vosstania 1",
  total: 2200,
  items: [
    "854cef69-976d-4c2a-a18c-2aa45046c390",
    "c101ab44-ed99-4a54-990d-47aa2bb4e7d9"
  ]
}
apiModel.postData(data);
// тестирование класса Products
productsModel.savedList(products.items); // сохранение товаров
const productObject = productsModel.getList(); // получение товаров
console.log('Получение товаров', productObject);
console.log('Поиск товара по айди', productsModel.getProductId('c101ab44-ed99-4a54-990d-47aa2bb4e7d9')); // поиск товара по айди
console.log('Поиск товара по айди', productsModel.getProductId('123')); // поиск товара по айди
productsModel.saveProduct(products.items[0]); // сохранение карточки товара
console.log('Получение карточки товара', productsModel.getProduct()); // получение карточки товара

// тестирование класса Buyer
// предполагаемые данные покупателя
const BuyerInfo: IBuyer = { 
    payment: 'card',
    email: "",
    phone: "+71234567890",
    address: "Spb Vosstania 1",
    }
buyerModel.saveData(BuyerInfo); // сохранение данных
console.log('Получение данных', buyerModel.getDataBuyer()); // получение данных
buyerModel.removeDataBuyer(); // очищение данных
buyerModel.saveData(BuyerInfo); // заново сохраняю данные
console.log('Получение данных', buyerModel.getDataBuyer()); // получение данных
console.log('Валидация данных', buyerModel.validationData()); // валидация данных

// тестирование класса Basket
basketModel.addProductBasket(products.items[1]) // добавление товара в корзину
basketModel.addProductBasket(products.items[2])
basketModel.addProductBasket(products.items[3])
console.log('Получение списка товаров в корзине', basketModel.getListProducts()) // получение списка товаров
basketModel.deleteProductBasket(products.items[1]) // удаление товара (мутирующий массив)
console.log('Получение списка товаров в корзине', basketModel.getListProducts()) // получение списка товаров
console.log('Получение общей суммы товаров', basketModel.getAllMoneyBasket()) // получение общей суммы товаров
console.log('Получение общего кол-ва товаров', basketModel.getQuantityBasket()) // получение общего кол-ва товаров
console.log('Есть ли товар в корзине', basketModel.checkProductIdBasket("412bcf81-7e75-4e70-bdb9-d3c73c9803b7"))
console.log('Есть ли товар в корзине', basketModel.checkProductIdBasket("123"))
basketModel.removeBasket(); // очистка корзины
console.log('Получение списка товаров в корзине', basketModel.getListProducts()) // получение списка товаров в корзине

// запрос данных с сервера
const productsServer = apiModel.getProductList().then(response => {
  productsModel.savedList(response.items)
  console.log('Данные с сервера', productsModel.getList())
}).catch (() => {console.error('Ошибка данных')})
