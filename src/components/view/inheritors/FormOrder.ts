import { Form } from "../Form";
import { ensureElement } from "../../../utils/utils";
import { OrderData } from "../../../types";
import { IEvents } from "../../base/Events";

export class FormOrder extends Form<OrderData> {
    protected cardButtonElement: HTMLButtonElement;
    protected cashButtonElement: HTMLButtonElement;
    protected addressElement: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
        this.cardButtonElement = ensureElement<HTMLButtonElement>('button[name="card"]', container);
        this.cashButtonElement = ensureElement<HTMLButtonElement>('button[name="cash"]', container);
        this.addressElement = ensureElement<HTMLInputElement>('.form__input', container);

        this.container.addEventListener('submit', (e) => {
            e.preventDefault();
            events.emit('order:submit')});
        this.container.addEventListener('input', () => events.emit('order:change', { address: this.addressElement.value }));

        this.cardButtonElement.addEventListener('click', () =>
            events.emit('order:change', { payment: 'card' }));

        this.cashButtonElement.addEventListener('click', () =>
            events.emit('order:change', { payment: 'cash' })        
        );
    }

    set payment(value: string) {
        if (value === 'card') {
            this.cardButtonElement.classList.add('button_alt-active');
            this.cashButtonElement.classList.remove('button_alt-active');;
        } else {
            this.cashButtonElement.classList.add('button_alt-active');
            this.cardButtonElement.classList.remove('button_alt-active');
        }
    }

    set address(value: string) {
        this.addressElement.value = value;
    }
}
