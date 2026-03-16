import './scss/styles.scss';

import { ProductCatalog } from './components/models/ProductCatalog';
import { Cart } from './components/models/Cart';
import { Buyer } from './components/models/Buyer';

import { apiProducts } from './utils/data';
import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';
import { GetPost } from './components/communicate/GetPost';

// Тестирование каталога
const productCatalog = new ProductCatalog(apiProducts.items);
console.log("Массив товаров из каталога: ", productCatalog.getProducts());
console.log("Массив товаров после обновления: ", productCatalog.setProducts([...apiProducts.items, {id: "new-product-id", title: "New Product", price: 100, description: "A new product", image: "/new-product.jpg", category: "other"}]), productCatalog.getProducts());
console.log("Поиск товара по ID: ", productCatalog.getById("b06cde61-912f-4663-9751-09956c0eed67"));
console.log("Установка выбранной карточки: ", productCatalog.previewCard = productCatalog.getById("b06cde61-912f-4663-9751-09956c0eed67"));
console.log("Получение выбранной карточки: ", productCatalog.previewCard);

// Тестирование корзины
const cart = new Cart(null);
console.log("Получение содержимого корзины: ", cart.getCart());

const newProduct = {
            "id": "new-id",
            "description": "test",
            "image": "/test",
            "title": "+1 час в сутках",
            "category": "test",
            "price": 750
        };
const secondProduct = {
            "id": "second-id",
            "description": "test2",
            "image": "/test2",
            "title": "+2 часа в сутках",
            "category": "test",
            "price": 1500
        };
console.log("Добавление товара в корзину: ", cart.addToCart(newProduct), cart.getCart());
console.log("Добавление второго товара в корзину: ", cart.addToCart(secondProduct), cart.getCart());
console.log("Удаление товара из корзины: ", cart.deleteFromCart("new-id"), cart.getCart());
console.log("Получение общей суммы: ", cart.getSum());
console.log("Получение количества товаров: ", cart.getAmount());
console.log("Проверка по ID (существующий ID): ", cart.checkById("second-id"));
console.log("Проверка по ID (несуществующий ID): ", cart.checkById("non-existent-id"));
console.log("Очистка корзины: ", cart.clearCart(), cart.getCart());

// Тестирование покупателя
const buyer = new Buyer({payment: 'card', email: 'buyer@example.com', phone: '+79671234567', address: '123 Main St'});
console.log("Получение данных покупателя: ", buyer.getData());
console.log("Сохранение данных: ", buyer.saveData({payment: 'cash', email: 'buyer_updated@example.com'}), buyer.getData());
console.log("Валидация данных: ", buyer.validate());
console.log("Очистка данных покупателя: ", buyer.clearData(),buyer.getData());

// Тестирование API
const api = new Api(API_URL);
const getPost = new GetPost(api);
getPost.getCatalog()
    .then(products => {
        productCatalog.setProducts(products);
        console.log("Обновленный каталог: ", productCatalog.getProducts());
    })
    .catch(error => console.error("Ошибка при получении каталога: ", error));
