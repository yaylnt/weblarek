**English** | [Русский](/docs/architecture.ru.md)

### Data

#### IProduct Interface

The interface contains the necessary data for each product.

Interface fields: `id: string` - the unique identifier of the product. `description: string` - a detailed description of the product, shown when a card is selected. `image: string` - the image for the product card. `title: string` - the product name. `category: string` - the product category. `price: number | null` - the product price. If it is absent, the product is considered "priceless" and unavailable for purchase.

#### IBuyer Interface

The interface contains the buyer's data.

Interface fields: `payment: TPayment | null` - the payment type, possible values: 'card' | 'cash'. `null` if the payment type has not been selected yet or the user data has been cleared. `email: string` - email address. `phone: string` - phone number. `address: string` - delivery address.

### Data Models

#### ProductCatalog Class

Stores the array of all products and the selected product card. Makes it possible to get and save the list of products and an individual product.

Constructor: `constructor(events: EventEmitter)` - the constructor takes an instance of the event broker.

Class fields: `products: IProduct[]` - the array of products. `previewCard: IProduct | null` - the card selected for viewing, or `null` if none has been selected yet.

Properties: `previewProduct: IProduct | null` - a getter and setter for the product card selected for detailed viewing. Allows setting and getting this card.

Class methods: `setProducts(products: IProduct[]): void` - saves the array of products received in the method's parameters. `getProducts(): IProduct[]` - gets the array of products from the model. `getById(id: string): IProduct | undefined` - gets a single product by its id.

#### Cart Class

Implements the cart functionality: storing the selected products, adding and removing products, getting the total price and the number of products, and checking whether a product is in the cart by its id.

Constructor: `constructor(events: EventEmitter)` - the constructor takes an instance of the event broker.

Class fields: `cartProducts: IProduct[]` - the array of products the user has added to the cart.

Class methods: `getCart(): IProduct[]` - gets the array of products in the cart. `addToCart(product: IProduct): void` - adds a product to the cart. `deleteFromCart(id: string): void` - removes a product from the cart. `clearCart(): void` - clears the cart. `getSum(): number | null` - gets the total price of all products in the cart. `getAmount(): number | null` - gets the number of products in the cart. `checkById(id: string): boolean` - checks whether a product is in the cart by its id.

#### Buyer Class

Works with the buyer's data and provides its validation.

Constructor: `constructor(events: EventEmitter)` - the constructor takes an instance of the event broker.

Class fields: `payment: TPayment | null` - the payment type, possible values: 'card' | 'cash'. `email: string` - email address. `phone: string` - phone number. `address: string` - delivery address.

Class methods: `saveData(data: Partial<IBuyer>): void` - saves data in the model. `getData(): IBuyer` - gets all the buyer's data. `clearData(): void` - clears the buyer's data. `validate(): Partial<Record<keyof IBuyer, string>>` - validates the data: a field is valid if it is not empty. If the returned object is empty, validation has passed successfully.

### Communication Layer

#### IOrder Interface

Contains the order data, including the buyer data from the IBuyer interface.

Interface fields: `payment: TPayment | null` - the payment type, possible values: 'card' | 'cash'. `null` if the payment type has not been selected yet or the user data has been cleared. `email: string` - email address. `phone: string` - phone number. `address: string` - delivery address. `total: number` - the total order amount. `items: string[]` - an array of product ids.

#### GetPost Class

Uses composition to make a request to the server with the `get` method, receiving from the server an object with an array of products, and sends the buyer data and the selected products to the server with the `post` method.

Constructor: `constructor(api: IApi)` - the constructor takes an object implementing the IApi interface and stores it in an internal field of the class.
This object is used to perform all network requests.

Class fields: `api: IApi` - the object used to perform HTTP requests.

Class methods: `getCatalog(): Promise<TProductResponse>` - fetches the product catalog from the server by performing a GET request. `createOrder(order: IOrder): Promise<TOrderResponse>` - sends the order data to the server using POST.

### View Layer

UML diagram [![UML diagram of the view layer](https://github.com/yaylnt/weblarek/raw/main/docs/src/images/UML.jpg)](/docs/src/images/UML.jpg)

#### Header Class

Responsible for displaying the application header and the cart item counter. Extends the Component class.

Constructor: `constructor(container: HTMLElement, events: IEvents)` - the constructor takes the container for the cart icon and the event broker.

Class fields: `basketButton: HTMLButtonElement` - the button for going to the cart. `counterElement: HTMLElement` - the element displaying the number of products.

Class properties: `set counter(value: number)` - sets the product counter value.

#### HeaderData Type

The type of data the Header class works with.

`counter: number` - the number of products in the cart.

#### Gallery Class

Responsible for displaying the list of product cards on the main page. Extends the Component class.

Constructor: `constructor(container: HTMLElement)` - the constructor takes the container for the card gallery.

Class fields: `catalogElement: HTMLElement` - the container for the card gallery.

Class properties: `set catalog(items: HTMLElement[])` - sets the list of card DOM elements.

#### GalleryData Type

The type of data the Gallery class works with.

`catalog: HTMLElement[]` - the list of cards.

#### Modal Class

Manages the modal window. Extends the Component class.

Constructor: `constructor(container: HTMLElement, events: IEvents)` - the constructor takes the container for the modal window and the event broker.

Class fields: `closeButton: HTMLButtonElement` - the close button. `contentElement: HTMLElement` - the element for the content.

Class properties: `set content(content: HTMLElement)` - sets the content of the modal window.

Class methods: `open(): void` - opens the modal window. `close(): void` - closes the modal window.

#### ModalData Type

The type of data the Modal class works with.

`content: HTMLElement` - the content of the modal window.

#### SuccessOrder Class

Displays a successful order confirmation. Extends the Component class.

Constructor: `constructor(container: HTMLElement, events: IEvents)` - the constructor takes the container for displaying the successful order and the event broker.

Class fields: `successButton: HTMLButtonElement` - the confirmation button. `sumElement: HTMLElement` - the element for displaying the order total.

Class properties: `set sum(sum: number)` - sets the order total.

#### SuccessData Type

The type of data the SuccessOrder class works with.

`sum: number` - the final order total.

#### Card Class

The base class of a product card. Extends the Component class.

Constructor: `constructor(container: HTMLElement)` - the constructor takes the container for the product card.

Class fields: `nameElement: HTMLElement` - the product name element. `priceElement: HTMLElement` - the product price element.

Class properties: `set name(name: string)` - sets the product name. `set price(value: number)` - sets the product price.

#### CardData Type

The type of data the Card class works with.

`name: string` - the product name. `price: number` - the price.

#### CardCatalog Class

A product card in the catalog. Extends the Card class.

Constructor: `constructor(container: HTMLElement, actions?: ICatalogActions)` - the constructor takes the container for the card displayed inside the catalog and an object with the card's actions.

Class fields: `categoryElement: HTMLElement` - the product category. `imageElement: HTMLImageElement` - the product image. `catalogButton: HTMLButtonElement` - the button that opens the detailed product description in a modal window when clicked.

Class properties: `set category(name: string)` - sets the category. `set image(src: string)` - sets the image.

#### CardCatalogData Type

The type of data the CardCatalog class works with.

`category: string` - the product category. `image: string` - the image link.

#### CardPreview Class

A product card with a detailed description, opened in a modal window. Extends the Card class.

Constructor: `constructor(container: HTMLElement, events: IEvents)` - the constructor takes the container for the card opened inside the modal window and the event broker.

Class fields: `imageElement: HTMLImageElement` - the product image. `categoryElement: HTMLElement` - the product category. `descriptionElement: HTMLElement` - the product description. `addButton: HTMLButtonElement` - the button for adding the product to the cart.

Class properties: `set image(src: string)` - sets the product image. `set category(name: string)` - sets the product category. `set description(text: string)` - sets the product description. `set addButtonText(text: string)` - changes the text of the buy button. `set disableAddButton(value: boolean)` - controls the availability of the add-to-cart button.

#### CardPreviewData Type

The type of data the CardPreview class works with.

`image: string` - the image. `category: string` - the category. `description: string` - the description.

#### CardBasket Class

Responsible for displaying a product card in the cart. Extends the Card class.

Constructor: `constructor(container: HTMLElement, actions?: ICardActions)` - the constructor takes the container for the card in the cart and an object with the card's actions.

Class fields: `indexElement: HTMLElement` - the product's sequence number. `deleteButton: HTMLButtonElement` - the button for removing the product from the cart.

Class properties: `set index(number: number)` - sets the sequence number.

#### CardBasketData Type

The type of data the CardBasket class works with.

`index: string` - the product index.

#### Basket Class

Responsible for displaying the cart. Extends the Component class.

Constructor: `constructor(container: HTMLElement, events: IEvents)` - the constructor takes the container for the cart and the event broker.

Class fields: `sumElement: HTMLElement` - the total amount element. `orderButton: HTMLButtonElement` - the checkout button. `cardListElement: HTMLElement` - the list of products.

Class properties: `set sum(value: number)` - sets the total. `set items(items: HTMLElement[])` - sets the list of products. `set disableOrderButton(value: boolean)` - controls the availability of the checkout button.

#### BasketData Type

The type of data the Basket class works with.

`sum: number` - the total amount. `items: HTMLElement[]` - the list of products.

#### Form Class

The base class of a form with validation. Extends the Component class.

Constructor: `constructor(container: HTMLFormElement, events: IEvents)` - the constructor takes the container for the form and the event broker.

Class fields: `submitButtonElement: HTMLButtonElement` - the submit button. `errorsElement: HTMLElement` - the container for errors.

Class properties: `set errors(value: string[])` - displays errors. `set isValid(value: boolean)` - controls the form's validity state.

Class methods: `validationState(errors: Array<string | undefined>): void` - filters the array of errors, displays them and controls the state of the submit button.

#### FormData Type

The type of data the Form class works with.

`errors: string[]` - the list of errors. `isValid: boolean` - whether the form is valid.

#### FormOrder Class

The checkout form with payment type selection and the address. Extends the Form class.

Constructor: `constructor(container: HTMLFormElement, events: IEvents)` - the constructor takes the container for the form with the payment type and address data and the event broker.

Class fields: `cardButtonElement: HTMLButtonElement` - the button for choosing card payment. `cashButtonElement: HTMLButtonElement` - the button for choosing payment on delivery. `addressElement: HTMLInputElement` - the address field.

Class properties: `set payment(value: string)` - toggles the active state of the payment method buttons. `set address(value: string)` - sets the value of the address field.

#### OrderData Type

The type of data the FormOrder class works with.

`payment: string` - the payment method. `address: string` - the delivery address.

#### FormContacts Class

The form with the buyer's contact details. Extends the Form class.

Constructor: `constructor(container: HTMLFormElement, events: IEvents)` - the constructor takes the container for the form with the buyer's contacts and the event broker.

Class fields: `emailElement: HTMLInputElement` - the email field. `phoneElement: HTMLInputElement` - the phone field.

Class properties: `set email(value: string)` - sets the value of the email field. `set phone(value: string)` - sets the value of the phone field.

#### ContactsData Type

The type of data the FormContacts class works with.

`email: string` - email `phone: string` - phone

### Event Descriptions

| Event             | Description                                                                                          | Data                                       | Source                |
| ----------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------ | --------------------- |
| `basket:click`    | The user clicked the cart icon in the header                                                         | none                                       | `Header.ts`           |
| `basket:change`   | The cart contents changed: a product was added, removed, or the cart was cleared                     | `{ cart: IProduct[] }`                     | `Cart.ts`             |
| `products:change` | The product catalog was loaded or updated in the model                                               | `{ products: IProduct[] }`                 | `ProductCatalog.ts`   |
| `preview:change`  | The user selected a product card in the catalog to open the preview                                  | `{ previewCard: IProduct }`                | `ProductCatalog.ts`   |
| `preview:toggle`  | The user clicked the button for adding or removing the product in the preview                        | none                                       | `CardPreview.ts`      |
| `card:add`        | The presenter initiated adding the selected product to the cart                                      | `{ id: string }`                           | `main.ts`             |
| `card:remove`     | The presenter initiated removing a product from the cart                                             | `{ id: string }`                           | `main.ts`             |
| `modal:open`      | The modal window was opened                                                                          | none                                       | `main.ts`             |
| `modal:close`     | The modal window was closed (the user clicked the close button, or closing was initiated by the presenter) | none                                 | `Modal.ts`, `main.ts` |
| `order:start`     | The user clicked the "Checkout" button in the cart                                                   | none                                       | `Basket.ts`           |
| `order:submit`    | The user submitted the order form (payment and address)                                              | none                                       | `FormOrder.ts`        |
| `order:change`    | The user changed data in the order form                                                              | `{ payment?: TPayment, address?: string }` | `FormOrder.ts`        |
| `contacts:submit` | The user submitted the contact details form                                                          | none                                       | `FormContacts.ts`     |
| `contacts:change` | The user changed the email or phone in the contacts form                                             | `{ email?: string, phone?: string }`       | `FormContacts.ts`     |
| `buyer:change`    | The buyer data in the model changed and the state of the forms needs to be recalculated              | `{ buyer: IBuyer }`                        | `Buyer.ts`            |
| `success:close`   | The user clicked the "Continue shopping!" button on the order success screen                         | none                                       | `SuccessOrder.ts`     |

### Presenter

Since the application is a single page, the presenter is described without a separate class, in the main.ts file.
It is responsible for loading the catalog, opening modal windows, synchronizing the cart, validating the order forms and submitting the order to the server.