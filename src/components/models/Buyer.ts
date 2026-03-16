import { IBuyer, TPayment } from "../../types/index.ts";

export class Buyer implements IBuyer {
    payment!: TPayment | null;
    email: string = '';
    phone: string = '';
    address: string = '';

    constructor(data: IBuyer) {
        Object.assign(this, data);
    }

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

    validate(): {} {
        const validator: {status: string, errors: string[]} = {
            status: 'error',
            errors: [],
        };
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?[0-9]{7,15}$/;

        if (!this.payment) {
            validator.errors.push("Не выбран вид оплаты");
        }

        if (!emailRegex.test(this.email)) {
            validator.errors.push("Некорректный email");
        }

        if (!this.email) {
            validator.errors.push("Укажите email");
        }

        if (!phoneRegex.test(this.phone)) {
            validator.errors.push("Некорректный номер телефона");
        }

        if (!this.phone) {
            validator.errors.push("Укажите номер телефона");
        }

        if (!this.address) {
            validator.errors.push("Укажите адрес доставки");
        }

        if (validator.errors.length === 0) {
            validator.status = 'success';
        }

        return validator;
    }
}