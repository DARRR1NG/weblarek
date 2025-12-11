import './scss/styles.scss';
import { Products } from './components/Models/Products';
import { Buyer } from './components/Models/Buyer';
import { Basket } from './components/Models/Basket';
import { Communication } from './components/Models/Communication';
import { API_URL } from './utils/constants';
import { IBuyer, IOrderResponse } from './types';
import { CardCatalog } from './components/View/CardCatalog';
import { EventEmitter } from './components/base/Events';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Gallery } from './components/View/Gallery';
import { Header } from './components/View/Header';
import { Modal } from './components/View/Modal';
import { BasketFull } from './components/View/BasketFull';
import { CardBasket } from './components/View/CardBasket';
import { CardFull } from './components/View/CardFull';
import { Order } from './components/View/Order';
import { Contacts } from './components/View/Contacts';
import { OrderSuccess } from './components/View/OrderSuccess';

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
const orderSuccessModel = new OrderSuccess(events, cloneTemplate('#success'))

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
  modal.open();
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
  formOrder.fault = '';
  modal.render({content: formOrder.render()})
})

events.on('form:change', (events: {field: keyof IBuyer, value: string}) => {
  buyerModel.saveData({[events.field]: events.value})
  const dataBuyer = buyerModel.getDataBuyer();
  console.log(dataBuyer)
})


events.on('dataBuyer:change', () => {
  const dataBuyer = buyerModel.getDataBuyer();
  const errors = buyerModel.validationData();

  if (dataBuyer) {
    formOrder.payment = dataBuyer.payment || ''
    formOrder.address = dataBuyer.address || ''
    formContacts.email = dataBuyer.email || ''
    formContacts.phone = dataBuyer.phone || ''
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
  } else {
    formOrder.buttonState = false
  }
  if (errorsTextContacts.length > 0) {
    formContacts.buttonState = true;
  } else {
    formContacts.buttonState = false
  }

  formOrder.fault = errorsTextOrder.join(', ')
  formContacts.fault = errorsTextContacts.join(', ')
})

events.on('order:click', () => {
  formContacts.fault = ''
  modal.render({content: formContacts.render()});
})

events.on('contacts:click', () => {
  const dataBuyerInfo = buyerModel.getDataBuyer();
  const dataAll: IOrderResponse = {...dataBuyerInfo, total: basketModel.getAllMoneyBasket(), items: basketModel.getListProducts().map(item => item.id)};
  apiModel.postData(dataAll).then(() => {
    basketModel.removeBasket();
    orderSuccessModel.finalTotal = dataAll.total;
    }).catch (() => {console.error('Ошибка данных')})
    modal.render({content: orderSuccessModel.render()})
})

events.on('ready:close', ()  => {modal.close()})