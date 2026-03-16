import { IApi, IOrder, TOrderResponse, TProductResponse } from "../../types/index.ts";

export class GetPost {
    protected api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    getCatalog(): Promise<TProductResponse> {
        return this.api.get('/product/');
    }

    createOrder(order: IOrder): Promise<TOrderResponse> {
        return this.api.post('/order/', order);
    }
}