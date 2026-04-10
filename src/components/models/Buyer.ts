import { ErrorsBuyer, IBuyer, TPayment } from "../../types/index.ts";
import { EventEmitter } from "../base/Events.ts";

export class Buyer {
    protected payment: TPayment | null = null;
    protected email: string = '';
    protected phone: string = '';
    protected address: string = '';
    protected events: EventEmitter;

    constructor(events: EventEmitter) {
        this.events = events;
    }

    saveData(data: Partial<IBuyer>): void {
        Object.assign(this, data);
        this.events.emit('buyer:change');
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
        this.events.emit('buyer:change');
    }

    validate(): ErrorsBuyer {
        const validator: ErrorsBuyer = {};

        if (!this.payment) {
            validator.payment = "Не выбран вид оплаты";
        }

        if (!this.email.trim()) {
            validator.email = "Укажите email";
        }

        if (!this.phone.trim()) {
            validator.phone = "Укажите номер телефона";
        }

        if (!this.address.trim()) {
            validator.address = "Укажите адрес доставки";
        }

        return validator;
    }
}