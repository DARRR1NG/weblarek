# Проектная работа, интернет-магазин «Web-Larёk»

Стек: HTML, SCSS, TS, Vite

## :file_folder: Структура проекта
Структура проекта:
- `docs` — файлы для сборки сайта на GitHub pages
- `src/` — исходные файлы проекта
- `src/components/` — папка с JS компонентами
- `src/components/base/` — папка с базовым кодом

Важные файлы:
- `index.html` — HTML-файл главной страницы
- `src/types/index.ts` — файл с типами
- `src/main.ts` — точка входа приложения
- `src/scss/styles.scss` — корневой файл стилей
- `src/utils/constants.ts` — файл с константами
- `src/utils/utils.ts` — файл с утилитами

<img width="1072" height="714" alt="image" src="https://github.com/user-attachments/assets/c4d115b6-2116-428c-94b2-4b6f48dfc7fd" />

<img width="1075" height="716" alt="image" src="https://github.com/user-attachments/assets/52eea6de-fd3e-46e4-9e37-2f83b258665f" />

<img width="1073" height="715" alt="image" src="https://github.com/user-attachments/assets/c8ff47a1-8d06-4e4d-a422-eecc1eeee776" />

## :heavy_check_mark: Инструкция по запуску
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run dev
```

или

```
yarn
yarn dev
```
### Сборка

```
npm run build
```

или

```
yarn build
```
## :grey_question: Описание проекта
«Web-Larёk» — это интернет-магазин с товарами для веб-разработчиков, где пользователи могут просматривать товары, добавлять их в корзину и оформлять заказы. Сайт предоставляет удобный интерфейс с модальными окнами для просмотра деталей товаров, управления корзиной и выбора способа оплаты, обеспечивая полный цикл покупки с отправкой заказов на сервер.

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP (Model-View-Presenter), которая обеспечивает четкое разделение ответственности между классами слоев Model и View. Каждый слой несет свой смысл и ответственность:

Model - слой данных, отвечает за хранение и изменение данных.  
View - слой представления, отвечает за отображение данных на странице.  
Presenter - презентер содержит основную логику приложения и  отвечает за связь представления и данных.

Взаимодействие между классами обеспечивается использованием событийно-ориентированного подхода. Модели и Представления генерируют события при изменении данных или взаимодействии пользователя с приложением, а Презентер обрабатывает эти события используя методы как Моделей, так и Представлений.

### Базовый код

#### Класс Component
Является базовым классом для всех компонентов интерфейса.
Класс является дженериком и принимает в переменной `T` тип данных, которые могут быть переданы в метод `render` для отображения.

Конструктор:  
`constructor(container: HTMLElement)` - принимает ссылку на DOM элемент за отображение, которого он отвечает.

Поля класса:  
`container: HTMLElement` - поле для хранения корневого DOM элемента компонента.

Методы класса:  
`render(data?: Partial<T>): HTMLElement` - Главный метод класса. Он принимает данные, которые необходимо отобразить в интерфейсе, записывает эти данные в поля класса и возвращает ссылку на DOM-элемент. Предполагается, что в классах, которые будут наследоваться от `Component` будут реализованы сеттеры для полей с данными, которые будут вызываться в момент вызова `render` и записывать данные в необходимые DOM элементы.  
`setImage(element: HTMLImageElement, src: string, alt?: string): void` - утилитарный метод для модификации DOM-элементов `<img>`


#### Класс Api
Содержит в себе базовую логику отправки запросов.

Конструктор:  
`constructor(baseUrl: string, options: RequestInit = {})` - В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.

Поля класса:  
`baseUrl: string` - базовый адрес сервера  
`options: RequestInit` - объект с заголовками, которые будут использованы для запросов.

Методы:  
`get(uri: string): Promise<object>` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер  
`post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.  
`handleResponse(response: Response): Promise<object>` - защищенный метод проверяющий ответ сервера на корректность и возвращающий объект с данными полученный от сервера или отклоненный промис, в случае некорректных данных.

#### Класс EventEmitter
Брокер событий реализует паттерн "Наблюдатель", позволяющий отправлять события и подписываться на события, происходящие в системе. Класс используется для связи слоя данных и представления.

Конструктор класса не принимает параметров.

Поля класса:  
`_events: Map<string | RegExp, Set<Function>>)` -  хранит коллекцию подписок на события. Ключи коллекции - названия событий или регулярное выражение, значения - коллекция функций обработчиков, которые будут вызваны при срабатывании события.

Методы класса:  
`on<T extends object>(event: EventName, callback: (data: T) => void): void` - подписка на событие, принимает название события и функцию обработчик.  
`emit<T extends object>(event: string, data?: T): void` - инициализация события. При вызове события в метод передается название события и объект с данными, который будет использован как аргумент для вызова обработчика.  
`trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие с передачей в него данных из второго параметра.

## Данные
В ходе анализа проекта было установлено: в приложении используются две сущности, которые описывают данные, — товар и покупатель. Их можно описать такими интерфейсами:

Интерфейс товара
Назначение: хранит типы данных товара, размещенных в магазине, для использования в классах ProductsMagazine и Basket.

```
interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}
```

Интерфейс покупателя
Назначение: хранит типы данных, получаемых от покупателя для использования в классе Customer.

```
interface IBuyer {
  payment: "'card' | 'cash' | ";
  email: string;
  phone: string;
  address: string;
}
```

## Модели данных
Для учёта данных в приложении должны быть три класса, которые будут разделены между собой по смыслу и зонам ответственности:

<b>Класс каталога товаров (class Products)</b><br>
Назначение и зона ответственности: хранение товаров, которые можно купить в приложении. <br>
Конструктор класса: - <br>
Поля класса: 
1. `chooseCard: IProduct | null = null` - хранение данных о выбранной карточке товара.
2. `productsList: IProduct[] = []` - хранение массива всех товаров магазина.
Методы класса:
1. `savedList(products: IProduct[]): void` - сохранение массива товаров полученного в параметрах метода.
2. `getList(): IProduct[]` - получение массива товаров из модели.
3. `getProductId(id: string): IProduct | undefined` - получение одного товара по его id.
4. `saveProduct(card: IProduct): void` - сохранение товара для подробного отображения.
5. `getProduct(): IProduct | null` - получение товара для подробного отображения.

<b>Класс корзины (class Basket)</b><br>
Назначение и зона ответственности: хранение товаров, которые пользователь выбрал для покупки.<br>
Конструктор класса: -<br>
Поля класса: 
1. `payList: IProduct[] = []` - хранение массива товаров в корзине.
Методы класса:
1. `getListProducts(): IProduct[]` - получение массива товаров, которые находятся в корзине.
2. `addProductBasket(item: IProduct): void` - добавление товара, который был получен в параметре, в массив корзины.
3. `deleteProductBasket(item: IProduct): void` - удаление товара, полученного в параметре из массива корзины.
4. `removeBasket(): IProduct[]` - очистка корзины.
5. `getAllMoneyBasket(): number` - получение стоимости всех товаров в корзине.
6. `getQuantityBasket(): number` - получение количества товаров в корзине.
7. `checkProductIdBasket(id: string): boolean` - проверка наличия товара в корзине по его id, полученного в параметре метода.

<b>Класс покупателя (class Buyer)</b><br>
Назначение и зона ответственности: данные покупателя, которые тот должен указать при оформлении заказа.<br>
Конструктор класса: -<br>
Поля класса: 
1. `BuyerInfo: IBuyer` - объект с незаполненными данными пользователя.
Методы класса:
1. `saveData(data: Partial<IBuyer>): void` - сохранение данных в модели.
2. `getDataBuyer(): IBuyer` - получение всех данных покупателя.
3. `removeDataBuyer(): void` - очистка данных покупателя.
4. `validationData(): IValidation` - валидация данных.

## Слой коммуникации
<b>Класс запроса на сервер (class Communication)</b><br>
Назначение и зона ответственности: выполнение запроса на сервер с помощью метода get класса Api и получение с сервера объекта с массивом товаров.<br>
Конструктор класса: `baseUrl: string, options: RequestInit = {}`<br>
Поля класса: -<br>
Методы класса:
1. `getProductsList(): Promise<IProductResponse>` - делает get запрос на эндпоинт /product/ и возвращает массив товаров.
2. `postData(order: IOrderResponse): Promise<IOrderResponse>` - делает post запрос на эндпоинт /order/ и передаёт в него данные, полученные в параметрах метода.

## Слой представления
Классы слоя представления (View)

<b>Класс взаимодейcтвия элементов шапки (class Header)</b> <br>
Назначение и зона ответственности: шапка магазина для изменения кол-ва товаров в корзине и нажатия на нее. <br>
Конструктор класса: `protected events: IEvents, container: HTMLElement` <br>
Поля класса: 
1. `basketButton: HTMLButtonElement`
2. `counterElement: HTMLElement`
Методы класса:
1. `set counter(value: number)` - установка числа кол-ва товаров в корзине.

<b>Класс карточки товара (Card)</b> <br>
Назначение и зона ответственности: родительский класс карточки товара. <br>
Конструктор класса: `container: HTMLElement` <br>
Поля класса:
1. `protected priceElement: HTMLElement`
2. `protected titleElement: HTMLElement`
3. `protected cardId?: string`
Методы класса:
1. `set id(value: string)` - установка id товара.
2. `set price(value: number | null)` - установка цены товара.
3. `set title(value: string)` - установка наименования товара.

<b>Класс карточки товара (Gallery)</b> <br>
Назначение и зона ответственности: галерея товаров. <br>
Конструктор класса: `container: HTMLElement` <br>
Поля класса: - <br>
Методы класса:
1. `catalog(products: HTMLElement[])` - установка каталога товаров.

<b>Класс галереи товаров (class CardCatalog extends Card)</b> <br>
Назначение и зона ответственности: отображение карточек товаров в магазине. <br>
Конструктор класса: `protected events: IEvents, container: HTMLElement` <br>
Поля класса:
1. `protected imageElement: HTMLImageElement`
2. `protected categoryElement: HTMLElement`
Методы класса:
1. `category(value: string)` - установка категории карточки товара.
2. `image(value: string)` - установка картинки карточки товара.

<b>Класс модального окна (class Modal)</b> <br>
Назначение и зона ответственности: модальное окно. <br>
Конструктор класса: `protected events: IEvents, container: HTMLElement` <br>
Поля класса:
1. `protected modalButton: HTMLButtonElement`
2. `protected modalContent: HTMLElement`
Методы класса:
1. `open()` - открытие модального окна.
2. `close()` - закрытие модального окна.
3. `content(items: HTMLElement)` - установка контента модального окна.

<b>Класс полной карточки товара(class CardFull extends Card)</b> <br>
Назначение и зона ответственности: окно с полной информацией карточки из галереи. <br>
Конструктор класса: `protected events: IEvents, container: HTMLElement` <br>
Поля класса:
1. `protected cardImage: HTMLImageElement`
2. `protected cardButton: HTMLButtonElement`
3. `protected cardCategory: HTMLElement`
4. `protected cardDescription: HTMLElement`
Методы класса:
1. `category(value: string)` - установка категории карточки товара.
2. `image(value: string)` - установка изображения.
3. `description(value: string)` - установка описания карточки товара.
4. `button(value: string)` - установка доступности нажатия кнопки.

<b>Класс карточки в корзине (class BasketFull)</b> <br>
Назначение и зона ответственности: карточка в корзине. <br>
Конструктор класса: `protected events: IEvents, container: HTMLElement` <br>
Поля класса:
1. `basketList: HTMLElement`
2. `basketButton: HTMLButtonElement`
3. `basketPrice: HTMLElement`
Методы класса:
1. `basketItems(cards: HTMLElement[])` - поведение корзины при наличии и отсутвии товаров.
2. `total(value: number)` - итоговая стоимость покупки.

<b>Класс товаров в корзине (class CardBasket extends Card)</b> <br>
Назначение и зона ответственности: информация корзины. <br>
Конструктор класса: `protected events: IEvents, container: HTMLElement` <br>
Поля класса:
1. `protected cardButton: HTMLButtonElement`
2. `protected index: HTMLElement`
Методы класса:
1. `indexCard(value: number)` - установка индекса карточки.

<b>Класс формы (Form)</b> <br>
Назначение и зона ответственности: родительский класс форм. <br>
Конструктор класса: `protected events: IEvents, container: HTMLElement` <br>
Поля класса:
1. `protected formButton: HTMLButtonElement`
2. `protected faults: HTMLElement`
Методы класса:
1. `fault(value: string)` - вывод ошибок.
2. `buttonState(value: boolean)` - флаг активной\неактивной кнопки.
3. `onInputChange(field: keyof T, value: string)` - генерация события изменения поля.

<b>Класс формы (class Order extends Form)</b> <br>
Назначение и зона ответственности: форма заказа. <br>
Конструктор класса: `protected events: IEvents, container: HTMLElement` <br>
Поля класса:
1. `protected moneyPayCash: HTMLButtonElement`
2. `protected moneyPayCard: HTMLButtonElement`
3. `protected addressInput: HTMLInputElement`
Методы класса:
1. `payment(value: paymentType)` - установка способа оплаты.
2. `address(value: string)` - установка адреса в поле.

<b>Класс формы (class OrderSuccess extends Form)</b> <br>
Назначение и зона ответственности: окно после заполнения форм. <br>
Конструктор класса: `protected events: IEvents, container: HTMLElement` <br>
Поля класса:
1. `protected description: HTMLElement`
2. `protected continueShopping: HTMLButtonElement`
Методы класса:
1. `finalTotal(value: number)` - итоговая цена покупки.

<b>Класс формы контактной информации (class Contacts extends Form)</b> <br>
Назначение и зона ответственности: форма контактных данных. <br>
Конструктор класса: `protected events: IEvents, container: HTMLElement` <br>
Поля класса:
1. `protected emailInput: HTMLInputElement`
2. `protected phoneInput: HTMLInputElement`
Методы класса:
1. `email(value: string)` - запоминание email
2. `phone(value: string)` - запоминание телефона

## Презентер

Презентер выполнен в файле <b>main.ts</b>.

Обработка событий:
1. `change:catalog` - рендер каталога карточек товара
2. `basket:open` - рендер корзины при нажатии на кнопку в шапке
3. `card:open` - сохранение карточки товара в модель данных
4. `cardModal:open` - открытие модального окна с подробным описанием карточки товара
5. `buy:products` - удаление или добавление товара в корзину
6. `basket:change` - изменение корзины
7. `card:remove` - удаление карточки из корзины
8. `continue` - переход к оформлению заказа
9. `form:change` - сохранение данных о покупателе в модель данных
10. `dataBuyer:change` - отображение ошибок при валидации данных
11. `order:click` - рендер второй формы
12. `contacts:click` - отправка POST запроса с данными покупателя и рендер итогового модального окна 
13. `ready:close` - закрытие итогового модального окна

## :art: Макет
https://www.figma.com/design/VQ6xUzaq07oZWq5FHhIAii/Yandex--Веб-ларёк-?timeline=keyframe&node-id=201-9445&p=f&t=3h6aU3rAslrxPnDQ-0
