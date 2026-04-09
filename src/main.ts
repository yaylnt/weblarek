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
import { IProduct, TPayment } from './types';
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
const basket = new Basket(cloneTemplate('#basket'), events);
const cardPreview = new CardPreview(cloneTemplate('#card-preview'), events);
const formOrder = new FormOrder(cloneTemplate('#order'), events);
const formContact = new FormContacts(cloneTemplate('#contacts'), events);
const successOrder = new SuccessOrder(cloneTemplate('#success'), events);

const renderElements = () => cart.getCart().map((item, index) => {
    const card = new CardBasket(cloneTemplate('#card-basket'), {onDelete: () => 
        events.emit('card:remove', { id: item.id })
    });
    card.index = index + 1;
    card.name = item.title;
    card.price = item.price || 0;
    return card.render();
});

// Загрузить товары с сервера
getPost.getCatalog()
    .then(products => {
        productCatalog.setProducts(products.items);   
    })
    .catch(error => console.error("Ошибка при получении каталога: ", error));

events.on('products:change', (data: { products: IProduct[] }) => {
    // Отобразить товары в галерее
    const galleryElements = data.products.map(product => {
        const cardTemplate = cloneTemplate('#card-catalog');
        const cardCatalog = new CardCatalog(cardTemplate, {onSelect: () => {
            productCatalog.previewProduct = product;
        }});
        return cardCatalog.render({
            image: CDN_URL + '/' + product.image,
            name: product.title,
            price: product.price || 0,
            category: product.category
        });
    });
    gallery.catalog = galleryElements;    
})

// Слушатели событий
events.on('basket:click', () => {
    modal.content = basket.render();
    modal.open();
});

events.on('basket:change', () => {
    basket.sum = cart.getSum() || 0;
    basket.items = renderElements();
    if (cart.getAmount() === 0) {
        basket.disableOrderButton = true;
    } else {
        basket.disableOrderButton = false;
    }
    header.counter = cart.getAmount() || 0
})

events.on('preview:change', () => {
    const product = productCatalog.previewProduct;
    if (product) {
        modal.content = cardPreview.render({
            image: CDN_URL + '/' + product.image,
            name: product.title,
            price: product.price || 0,
            category: product.category,
            description: product.description
        });
        const isInCart = cart.checkById(product.id);
        cardPreview.addButtonText = isInCart ? 'Удалить из корзины' : 'В корзину';
        if (!product.price) {
            cardPreview.disableAddButton = true;
        }
        else cardPreview.disableAddButton = false;
        modal.open();
    }
});

events.on('preview:toggle', () => {
    const product = productCatalog.previewProduct;
    if (product) {
        if (cart.checkById(product.id)) {
            events.emit('card:remove', { id: product.id });
        }
        else {
            events.emit('card:add', product);
        }   
    }
    modal.close();
})

events.on('card:add', (product: IProduct) => {
    if (product) {
        cart.addToCart(product);
    }
});

events.on('card:remove', (data: { id: string }) => {
    cart.deleteFromCart(data.id);
});

events.on('order:start', () => {
    modal.content = formOrder.render();
});

events.on('order:change', (data: Partial<{ payment: TPayment; address: string }>) => {
    if ('payment' in data) {
        buyer.saveData({ payment: data.payment }); 
    }
    if ('address' in data) {
        buyer.saveData({ address: data.address });
    }
});

events.on('order:submit', () => {
    modal.content = formContact.render();
});

events.on('contacts:change', (data: Partial<{ email: string; phone: string }>) => {
    if ('email' in data) {
        buyer.saveData({ email: data.email });
    }
    if ('phone' in data) {
        buyer.saveData({ phone: data.phone });
    }
});

events.on('buyer:change', () => {
    const currentBuyer = buyer.getData();
    const errors = buyer.validate();

    if (formOrder.render().isConnected) {
        formOrder.address = currentBuyer.address
        if (currentBuyer.payment) {
            formOrder.payment = currentBuyer.payment;
        }
        formOrder.validationState([errors.payment, errors.address]);
    }

    if (formContact.render().isConnected) {
        formContact.email = currentBuyer.email;
        formContact.phone = currentBuyer.phone;
        formContact.validationState([errors.email, errors.phone]);
    }
});

events.on('contacts:submit', () => {
    getPost.createOrder({ ...buyer.getData(), items: cart.getCart().map(item => item.id), total: cart.getSum() || 0 })
        .then(response => {   
            modal.content = successOrder.render({ sum: response.total });
            cart.clearCart();
            buyer.clearData();
        })
        .catch(error => console.error("Ошибка при создании заказа: ", error));
});

events.on('success:close', () => {
    modal.close();
});

