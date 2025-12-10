import './scss/styles.scss';
import { Products } from './components/Models/Products';
import { Buyer } from './components/Models/Buyer';
import { Basket } from './components/Models/Basket';
import { Communication } from './components/Models/Communication';
import { API_URL } from './utils/constants';
import { IBuyer, IOrderResponse } from './types';
import { apiProducts } from './utils/data';
import { Card } from './components/View/Card';
import { CardCatalog } from './components/View/CardCatalog';
import { IEvents, EventEmitter } from './components/base/Events';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Gallery } from './components/View/Gallery';
import { Header } from './components/View/Header';
import { Modal } from './components/View/Modal';
import { BasketFull } from './components/View/BasketFull';
import { CardBasket } from './components/View/CardBasket';
import { CardFull } from './components/View/CardFull';
import { Order } from './components/View/Order';
import { Contacts } from './components/View/Contacts';

const events = new EventEmitter();
const apiModel = new Communication(API_URL);
const productsModel = new Products(events);
const buyerModel = new Buyer(events);
const basketModel = new Basket(events)
const gallery = new Gallery(ensureElement('.gallery'));
const header = new Header(events, ensureElement('.header'));
const modal = new Modal(events, ensureElement('#modal-container'));
const basketShop = new BasketFull(events, cloneTemplate('#basket'));
const cardFull = new CardFull(events, cloneTemplate('#card-preview'));
const formOrder = new Order(events, cloneTemplate('#order'));
const formContacts = new Contacts(events, cloneTemplate('#contacts'));

// // сохранение данных с сервера
// const products = apiProducts;
// const data: IOrderResponse = {
//   payment: "card",
//   email: "test@test.ru",
//   phone: "+71234567890",
//   address: "Spb Vosstania 1",
//   total: 2200,
//   items: [
//     "854cef69-976d-4c2a-a18c-2aa45046c390",
//     "c101ab44-ed99-4a54-990d-47aa2bb4e7d9"
//   ]
// }
// apiModel.postData(data);
// // тестирование класса Products
// productsModel.savedList(products.items); // сохранение товаров
// const productObject = productsModel.getList(); // получение товаров
// console.log('Получение товаров', productObject);
// console.log('Поиск товара по айди', productsModel.getProductId('c101ab44-ed99-4a54-990d-47aa2bb4e7d9')); // поиск товара по айди
// console.log('Поиск товара по айди', productsModel.getProductId('123')); // поиск товара по айди
// productsModel.saveProduct(products.items[0]); // сохранение карточки товара
// console.log('Получение карточки товара', productsModel.getProduct()); // получение карточки товара

// // тестирование класса Buyer
// // предполагаемые данные покупателя
// const buyerInfo: Partial<IBuyer> = { 
//     payment: 'card',
//     phone: '87485734985'
// }

// const updateInfo: Partial<IBuyer> = {
//     email: "123@yandex.ru",
//     phone: ''
// }
// buyerModel.saveData(buyerInfo); // сохранение данных
// console.log('Получение данных', buyerModel.getDataBuyer()); // получение данных
// buyerModel.removeDataBuyer(); // очищение данных
// console.log('Данные после очистки', buyerModel.getDataBuyer())
// buyerModel.saveData(buyerInfo); // заново сохраняю данные
// console.log('Получение данных', buyerModel.getDataBuyer()); // получение данных
// console.log('Валидация данных', buyerModel.validationData()); // валидация данных
// buyerModel.saveData(updateInfo) // сохранение новых данных пользователем
// console.log('Получение новых данных', buyerModel.getDataBuyer()); // получение данных
// console.log('Валидация новых данных', buyerModel.validationData()); // валидация данных


// // тестирование класса Basket
// basketModel.addProductBasket(products.items[1]) // добавление товара в корзину
// basketModel.addProductBasket(products.items[2])
// basketModel.addProductBasket(products.items[3])
// console.log('Получение списка товаров в корзине', basketModel.getListProducts()) // получение списка товаров
// basketModel.deleteProductBasket(products.items[1]) // удаление товара (мутирующий массив)
// console.log('Получение списка товаров в корзине', basketModel.getListProducts()) // получение списка товаров
// console.log('Получение общей суммы товаров', basketModel.getAllMoneyBasket()) // получение общей суммы товаров
// console.log('Получение общего кол-ва товаров', basketModel.getQuantityBasket()) // получение общего кол-ва товаров
// console.log('Есть ли товар в корзине', basketModel.checkProductIdBasket("412bcf81-7e75-4e70-bdb9-d3c73c9803b7"))
// console.log('Есть ли товар в корзине', basketModel.checkProductIdBasket("123"))
// basketModel.removeBasket(); // очистка корзины
// console.log('Получение списка товаров в корзине', basketModel.getListProducts()) // получение списка товаров в корзине

// запрос данных с сервера
apiModel.getProductList().then(response => {
  productsModel.savedList(response.items)
  console.log('Данные с сервера', productsModel.getList())
}).catch (() => {console.error('Ошибка данных')})

events.on('change:catalog', () => 
  {const product = productsModel.getList().map((item) => 
    { const cardCatalog = new CardCatalog(events, cloneTemplate('#card-catalog'))
    return cardCatalog.render(item)})
      gallery.render({catalog: product})
  })

events.on('basket:open', () => 
  {
  modal.open();
  modal.render({content: basketShop.render()});
  })

events.on('card:open', (events: {cardId: string}) => {
  const idProduct = productsModel.getProductId(events.cardId);
  if (idProduct === undefined) {
    return
  }
  const saveProduct = productsModel.saveProduct(idProduct);
})

events.on('cardModal:open', () => {
  const chooseCard = productsModel.getProduct();
  if (!chooseCard) {
    return
  }
  let textButton = '';
  if (chooseCard?.price != null) {
    if (basketModel.checkProductIdBasket(chooseCard.id) === true) {
      textButton = 'Удалить из корзины';
      cardFull.button = textButton
    } else {
      textButton = 'Купить';
      cardFull.button = textButton
    }
  } else {
    textButton = 'Недоступно'
    cardFull.button = textButton;
  }
  modal.open()
  modal.render({content: cardFull.render(chooseCard)})
})

events.on('buy:products', () => {
  const chooseItem = productsModel.getProduct();
  if (!chooseItem) {
    return
  }
  const isBasketProduct = basketModel.checkProductIdBasket(chooseItem.id)
  if (isBasketProduct) {
    basketModel.deleteProductBasket(chooseItem)
  } else {
    basketModel.addProductBasket(chooseItem)
  }
  modal.close()
})

events.on('basket:change', () => {
  header.counter = basketModel.getQuantityBasket();
  const productsBasket = basketModel.getListProducts().map((item, index) => {
    const cardMini = new CardBasket(events, cloneTemplate('#card-basket'));
    cardMini.indexCard = index + 1;
    cardMini.title = item.title;
    cardMini.price = item.price;
    return cardMini.render(item)
  })
  basketShop.basketItems = productsBasket;
  basketShop.total = basketModel.getAllMoneyBasket();
  modal.render({content: basketShop.render()})
})

events.on('card:remove', (events: {cardId: string}) => {
  const product = productsModel.getProductId(events.cardId);
  if (!product) { return}
  basketModel.deleteProductBasket(product)
})

events.on('continue', () => {
  modal.render({content: formOrder.render()})
})

events.on('form:change', (events: {field: keyof IBuyer, value: string}) => {
  buyerModel.saveData({[events.field]: events.value})
})


events.on('dataBuyer:change', () => {
  const dataBuyer = buyerModel.getDataBuyer();
  const errors = buyerModel.validationData();

  if (!dataBuyer) {
    return
  }

  const errorsTextOrder = [];
  if (errors.payment) {
    errorsTextOrder.push(errors.payment)
  }
  if (errors.address) {
    errorsTextOrder.push(errors.address)
  }

  const errorsTextContacts = [];
  if (errors.phone) {
    errorsTextContacts.push(errors.phone)
  }
  if (errors.email) {
    errorsTextContacts.push(errors.email)
  }

  if (errorsTextOrder.length > 0) {
    formOrder.buttonState = true;
  }
  if (errorsTextContacts.length > 0) {
    formContacts.buttonState = true;
  }
})

events.on('order:click', () => {
  modal.render({content: formContacts.render()});
})

events.on('contacts:click', () => {})
