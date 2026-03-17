import { IBuyer, TPayment } from "../../types/index.ts";

export class Buyer {
    protected payment: TPayment | null = null;
    protected email: string = '';
    protected phone: string = '';
    protected address: string = '';

    constructor() {}

    saveData(data: Partial<IBuyer>): void {
        Object.assign(this, data);
    }

    getData(): IBuyer {
        return {
            payment: this.payment,
            email: this.email,
            phone: this.phone,
            address: this.address
        };
    }

    clearData(): void {
        this.payment = null;
        this.email = '';
        this.phone = '';
        this.address = '';
    }

    validate(): Partial<Record<keyof IBuyer, string>> {
        const validator: Partial<Record<keyof IBuyer, string>> = {};

        if (!this.payment) {
            validator.payment = "Не выбран вид оплаты";
        }

        if (!this.email) {
            validator.email = "Укажите email";
        }

        if (!this.phone) {
            validator.phone = "Укажите номер телефона";
        }

        if (!this.address) {
            validator.address = "Укажите адрес доставки";
        }

        return validator;
    }
}