import { IProduct } from "../../types/index.ts";
import { EventEmitter } from "../base/Events.ts";

export class ProductCatalog {
    protected products: IProduct[] = [];
    protected previewCard: IProduct | null = null;
    protected events: EventEmitter;

    constructor(events: EventEmitter) {
        this.events = events;
    }

    get previewProduct(): IProduct | null {
        return this.previewCard;
    }

    set previewProduct(product: IProduct | null) {
        this.previewCard = product;
        this.events.emit('preview:change', { previewCard: product });
    }

    setProducts(products: IProduct[]): void {
        this.products = products;
        this.events.emit('products:change', { products: this.products });
    }

    getProducts(): IProduct[] {
        return this.products;
    }

    getById(id: string): IProduct | null {
        const product = this.products.find((product) => product.id === id);
        return product || null;
    }
}