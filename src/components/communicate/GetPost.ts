import { IApi, IProduct, IOrder, IOrderResponse } from "../../types/index.ts";

export class GetPost {
    api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    getCatalog() {
        return this.api.get<IProduct[]>('/product/');
    }

    createOrder(order: IOrder) {
        return this.api.post<IOrderResponse>('/order/', order);
    }
}