import { IProduct } from "../../types/index.ts";
import { EventEmitter } from "../base/Events.ts";

export class Cart {
    protected cartProducts: IProduct[] = []; 
    protected events: EventEmitter;

    constructor(events: EventEmitter) {
        this.events = events;
    }

    getCart(): IProduct[] {
        return this.cartProducts;
    }

    addToCart(product: IProduct): void {
        if (this.cartProducts) {
            this.cartProducts.push(product);
        } else {
            this.cartProducts = [product];
        }
        this.events.emit('cart:change', { cart: this.cartProducts });
    }

    deleteFromCart(id: string): void {
        if (this.cartProducts) {
            this.cartProducts = this.cartProducts.filter((product) => product.id !== id);
            this.events.emit('cart:change', { cart: this.cartProducts });
        }
    }

    clearCart(): void {
        this.cartProducts = [];
        this.events.emit('cart:change', { cart: this.cartProducts });
    }

    getSum(): number | null {
        if (this.cartProducts) {
            return this.cartProducts.reduce((sum, product) => sum + (product.price || 0), 0);
        }
        return null;
    }

    getAmount(): number | null {
        if (this.cartProducts) {
            return this.cartProducts.length;
        }        
        return null;
    }

    checkById(id: string): boolean {
        if (this.cartProducts) {
            return this.cartProducts.some((product) => product.id === id);
        }
        return false;
    }
}