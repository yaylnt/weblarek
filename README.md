**English** | [Русский](/README.ru.md)

# Web-Larёk Online Store

"Web-Larёk" is an online store with products for web developers, where users can browse products, add them to the cart and place orders. The site provides a convenient interface with modal windows for viewing product details, managing the cart and choosing a payment method, covering the full purchase cycle with orders sent to the server.

## 💻[Demo](https://yaylnt.github.io/weblarek/)

https://github.com/user-attachments/assets/36279ff8-4473-48c9-822e-d9cfcba3244a

### Tech Stack

[![Skills](https://skillicons.dev/icons?i=ts,html,css,vite)](https://skillicons.dev/icons?i=ts,html,css,vite)

## My Contribution

- Developed the client-side architecture of the application in **TypeScript using OOP and the MVP pattern**, separating responsibilities between the Model, View and Presenter layers.

- Designed and implemented **data models** for the product catalog, the cart and the buyer data, with encapsulated state, validation and typed data-handling methods.

- Implemented a **type-safe data model** of the application in TypeScript: interfaces and types for products, the buyer, the order, API responses and View components.

- Implemented the **API communication layer**: fetching the product catalog via a GET request and submitting the order via a POST request.

- Designed and implemented the **View layer with reusable components and inheritance**: the base `Card` and `Form` classes, specialized catalog, preview and cart cards, and the checkout forms.

- Introduced an **event-driven model** of the application via `EventEmitter`: user actions and data changes are passed between layers without tightly coupling the components.

- Implemented the **Presenter**, connecting the models, views and API, and built the full user flow: catalog → product card → cart → two-step checkout → order submission → order success screen.

- Documented the project architecture: described the models, View components, events, the communication layer and the Presenter, and prepared a UML diagram of the View layer; set up **CI/CD and deployment to GitHub Pages**.

## Project Structure

- src/ - project source files
- src/components/ - folder with JS components
- src/components/base/ - folder with base code

Important files:

- index.html - HTML file of the main page
- src/types/index.ts - file with types
- src/main.ts - application entry point
- src/scss/styles.scss - root styles file
- src/utils/constants.ts - file with constants
- src/utils/utils.ts - file with utilities

## Installation and Running

To install and run the project, execute the following commands

```
npm install
npm run dev
```

or

```
yarn
yarn dev
```

## Build

```
npm run build
```

or

```
yarn build
```

## Application Architecture

The application code is divided into layers according to the MVP (Model-View-Presenter) paradigm, which provides a clear separation of responsibilities between the classes of the Model and View layers. Each layer has its own purpose and responsibility:

Model - the data layer, responsible for storing and changing data.  
View - the presentation layer, responsible for displaying data on the page.  
Presenter - the presenter contains the main application logic and is responsible for connecting the view and the data.

Interaction between classes is based on an event-driven approach. Models and Views emit events when data changes or when the user interacts with the application, and the Presenter handles these events using the methods of both Models and Views. A detailed description of the layers, models, events and View components is available [in the documentation](https://github.com/yaylnt/weblarek/blob/main/docs/architecture.md).

### Base Code

#### Component Class

The base class for all interface components.
The class is generic and accepts, in the type variable `T`, the type of data that can be passed to the `render` method for display.

Constructor:  
`constructor(container: HTMLElement)` - accepts a reference to the DOM element that the component is responsible for displaying.

Class fields:  
`container: HTMLElement` - a field for storing the component's root DOM element.

Class methods:  
`render(data?: Partial<T>): HTMLElement` - the main method of the class. It accepts the data to be displayed in the interface, writes this data into the class fields and returns a reference to the DOM element. It is assumed that classes inheriting from `Component` will implement setters for the data fields, which will be called when `render` is called and will write the data into the required DOM elements.  
`setImage(element: HTMLImageElement, src: string, alt?: string): void` - a utility method for modifying `<img>` DOM elements

#### Api Class

Contains the base logic for sending requests.

Constructor:  
`constructor(baseUrl: string, options: RequestInit = {})` - takes the base server address and an optional object with request headers.

Class fields:  
`baseUrl: string` - the base server address  
`options: RequestInit` - an object with the headers that will be used for requests.

Methods:  
`get(uri: string): Promise<object>` - performs a GET request to the endpoint passed in the parameters and returns a promise with the object the server responded with  
`post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - accepts an object with data that will be sent as JSON in the request body, and sends this data to the endpoint passed as a parameter when the method is called. A `POST` request is performed by default, but the request method can be overridden by setting the third parameter on call.  
`handleResponse(response: Response): Promise<object>` - a protected method that checks the server response for correctness and returns an object with the data received from the server, or a rejected promise in case of invalid data.

#### EventEmitter Class

The event broker implements the "Observer" pattern, allowing the system to emit events and subscribe to them. The class is used to connect the data layer and the presentation layer.

The class constructor takes no parameters.

Class fields:  
`_events: Map<string | RegExp, Set<Function>>)` - stores the collection of event subscriptions. The keys of the collection are event names or a regular expression, and the values are collections of handler functions that will be called when the event fires.

Class methods:  
`on<T extends object>(event: EventName, callback: (data: T) => void): void` - subscribes to an event; takes the event name and a handler function.  
`emit<T extends object>(event: string, data?: T): void` - emits an event. When called, the method receives the event name and an object with data that will be used as the argument for calling the handler.  
`trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void` - returns a function which, when called, emits the event specified in the parameters, passing into it the data from the second parameter.