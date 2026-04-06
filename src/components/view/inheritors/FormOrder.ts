import { Form } from "../Form";
import { ensureElement } from "../../../utils/utils";
import { OrderData } from "../../../types";
import { IEvents } from "../../base/Events";

export class FormOrder extends Form<OrderData> {
    protected onlineButtonElement: HTMLButtonElement;
    protected cashButtonElement: HTMLButtonElement;
    protected addressElement: HTMLInputElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this.onlineButtonElement = ensureElement<HTMLButtonElement>('button[name="card"]', container);
        this.cashButtonElement = ensureElement<HTMLButtonElement>('button[name="cash"]', container);
        this.addressElement = ensureElement<HTMLInputElement>('.form__input', container);

        this.container.addEventListener('submit', () => events.emit('order:submit'));
        this.container.addEventListener('input', () => events.emit('order:change', { address: this.addressElement.value }));

        this.onlineButtonElement.addEventListener('click', () => {
            events.emit('order:change', { paymentMethod: 'online' });
            this.onlineButtonElement.classList.add('button_alt-active');
            this.cashButtonElement.classList.remove('button_alt-active');
        });

        this.cashButtonElement.addEventListener('click', () => {
            events.emit('order:change', { paymentMethod: 'cash' });
            this.cashButtonElement.classList.add('button_alt-active');
            this.onlineButtonElement.classList.remove('button_alt-active');
        });
    }
}
