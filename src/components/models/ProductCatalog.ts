import { IProduct } from "../../types/index.ts";

export class ProductCatalog {
    protected products: IProduct[];
    protected _previewCard: IProduct | null;

    constructor(products: IProduct[], previewCard: IProduct | null = null) {
        this.products = products;
        this._previewCard = previewCard;
    }

    get previewCard(): IProduct | null {
        return this._previewCard;
    }

    set previewCard(product: IProduct | null) {
        this._previewCard = product;
    }

    setProducts(products: IProduct[]): void {
        this.products = products;
    }

    getProducts(): IProduct[] {
        return this.products;
    }

    getById(id: string): IProduct | null {
        const product = this.products.find((product) => product.id === id);
        return product || null;
    }
}