import { IProduct } from "../../types/index.ts";

export class ProductCatalog {
    protected products: IProduct[] = [];
    protected previewCard: IProduct | null = null;

    constructor() {}

    get previewProduct(): IProduct | null {
        return this.previewCard;
    }

    set previewProduct(product: IProduct | null) {
        this.previewCard = product;
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