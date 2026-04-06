import './scss/styles.scss';

import { EventEmitter } from './components/base/Events';
import { ProductCatalog } from './components/models/ProductCatalog';
import { Cart } from './components/models/Cart';
import { Buyer } from './components/models/Buyer';

import { Api } from './components/base/Api';
import { API_URL, CDN_URL } from './utils/constants';
import { GetPost } from './components/communicate/GetPost';

import { Header } from './components/view/Header';
import { Gallery } from './components/view/Gallery';
import { Modal } from './components/view/Modal';
import { cloneTemplate, ensureElement } from './utils/utils';
import { CardCatalog } from './components/view/inheritors/CardCatalog';
import { CardPreview } from './components/view/inheritors/CardPreview';
import { Basket } from './components/view/Basket';
import { CardBasket } from './components/view/inheritors/CardBasket';
import { FormOrder } from './components/view/inheritors/FormOrder';
import { FormContacts } from './components/view/inheritors/FormContacts';
import { TPayment } from './types';
import { SuccessOrder } from './components/view/SuccessOrder';

// Брокер событий
const events = new EventEmitter();

// Инициализация моделей
const productCatalog = new ProductCatalog(events);
const cart = new Cart(events);
const buyer = new Buyer(events);
const api = new Api(API_URL);
const getPost = new GetPost(api);

// Инициализация View-компонентов
const header = new Header(ensureElement<HTMLElement>('.header'), events);
const gallery = new Gallery(ensureElement<HTMLElement>('.gallery'));
const modal = new Modal(ensureElement<HTMLElement>('.modal'), events);
const basketTemplate = cloneTemplate('#basket');
const basket = new Basket(basketTemplate, events);
const previewTemplate = cloneTemplate('#card-preview');
const cardPreview = new CardPreview(previewTemplate, events);
const orderTemplate = cloneTemplate('#order') as HTMLFormElement;
const formOrder = new FormOrder(orderTemplate, events);
const contactTemplate = cloneTemplate('#contacts') as HTMLFormElement;
const formContact = new FormContacts(contactTemplate, events);


const cardElements = () => cart.getCart().map((item, index) => {
    const card = new CardBasket(cloneTemplate('#card-basket'), events);
    card.id = item.id;
    card.index = index + 1;
    card.name = item.title;
    card.price = item.price || 0;
    return card.render();
});

// Загрузить товары с сервера
getPost.getCatalog()
    .then(products => {
        productCatalog.setProducts(products.items);
        
        // Отобразить товары в галерее
        const galleryElements = products.items.map(product => {
            const cardTemplate = cloneTemplate('#card-catalog');
            const cardCatalog = new CardCatalog(cardTemplate, events);
            return cardCatalog.render({
                id: product.id,
                image: CDN_URL + '/' + product.image,
                name: product.title,
                price: product.price || 0,
                category: product.category
            });
        });
        gallery.catalog = galleryElements;
    })
    .catch(error => console.error("Ошибка при получении каталога: ", error));

// Слушатели событий
events.on('basket:click', () => {
    modal.content = basketTemplate;
    basket.sum = cart.getSum() || 0;
    basket.items = cardElements();
    if (cart.getAmount() === 0) {
        basket.disableOrderButton = true;
    } else {
        basket.disableOrderButton = false;
    }

    events.emit('modal:open');
});

events.on('card:select', (data: { id: string }) => {
    const product = productCatalog.getById(data.id);
    if (product) {
        modal.content = previewTemplate;
        cardPreview.render({
            id: product.id,
            image: CDN_URL + '/' + product.image,
            name: product.title,
            price: product.price || 0,
            category: product.category,
            description: product.description
        });
        cardPreview.inCart = cart.checkById(product.id);
        if (!product.price) {
            cardPreview.disableAddButton = true;
        }
        else cardPreview.disableAddButton = false;
        events.emit('modal:open');
    }
});

events.on('card:add', (data: { id: string }) => {
    const product = productCatalog.getById(data.id);
    if (product) {
        cart.addToCart(product);
        header.counter = cart.getAmount() || 0;
        basket.render();
    }
});

events.on('card:remove', (data: { id: string }) => {
    cart.deleteFromCart(data.id);
    header.counter = cart.getAmount() || 0;
    basket.render({
        sum: cart.getSum() || 0,
        items: cardElements()
    });
    if (cart.getAmount() === 0) {
        basket.disableOrderButton = true;
    }
});

events.on('order:start', () => {
    modal.content = orderTemplate;
});

events.on('order:change', (data: Partial<{ payment: TPayment; address: string }>) => {
    if ('payment' in data) {
        buyer.saveData({ payment: data.payment });
    }
    if ('address' in data) {
        buyer.saveData({ address: data.address });
    }
    const errorsList = buyer.validate();
    formOrder.validationState([errorsList.payment, errorsList.address]);
});

events.on('order:submit', () => {
    modal.content = contactTemplate;
});

events.on('contacts:change', (data: Partial<{ email: string; phone: string }>) => {
    if ('email' in data) {
        buyer.saveData({ email: data.email });
    }
    if ('phone' in data) {
        buyer.saveData({ phone: data.phone });
    }
    const errorsList = buyer.validate();
    formContact.validationState([errorsList.email, errorsList.phone]);
});

events.on('contacts:submit', () => {
    getPost.createOrder({ ...buyer.getData(), items: cart.getCart().map(item => item.id), total: cart.getSum() || 0 })
        .then(response => {
            const successTemplate = cloneTemplate('#success'); 
            const successOrder = new SuccessOrder(successTemplate, events);
            modal.content = successOrder.render({ sum: response.total });
            cart.clearCart();
            header.counter = 0;
            buyer.clearData();
            formContact.clear();
            formOrder.clear();
        })
        .catch(error => console.error("Ошибка при создании заказа: ", error));
});

events.on('success:close', () => {
    events.emit('modal:close');
});

events.on('modal:close', () => {
    modal.close();
});

events.on('modal:open', () => {
    modal.open();
});


