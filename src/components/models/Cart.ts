import { IProduct } from "../../types/index.ts";

export class Cart {
    protected cartProducts: IProduct[] = []; 

    constructor() {}

    getCart(): IProduct[] {
        return this.cartProducts;
    }

    addToCart(product: IProduct): void {
        if (this.cartProducts) {
            this.cartProducts.push(product);
        } else {
            this.cartProducts = [product];
        }
    }

    deleteFromCart(id: string): void {
        if (this.cartProducts) {
            this.cartProducts = this.cartProducts.filter((product) => product.id !== id);
        }
    }

    clearCart(): void {
        this.cartProducts = [];
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