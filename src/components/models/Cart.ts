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
        this.cartProducts.push(product);
        this.events.emit('basket:change', { cart: this.cartProducts });
    }

    deleteFromCart(id: string): void {
        this.cartProducts = this.cartProducts.filter((product) => product.id !== id);
        this.events.emit('basket:change', { cart: this.cartProducts });
    }

    clearCart(): void {
        this.cartProducts = [];
        this.events.emit('basket:change', { cart: this.cartProducts });
    }

    getSum(): number | null {
        return this.cartProducts.reduce((sum, product) => sum + (product.price || 0), 0);
    }

    getAmount(): number {
        return this.cartProducts.length;
    }

    checkById(id: string): boolean {
        return this.cartProducts.some((product) => product.id === id);
    }
}