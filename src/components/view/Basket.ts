import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";
import { BasketData } from "../../types";

export class Basket extends Component<BasketData> {
    protected sumElement: HTMLElement;
    protected orderButton: HTMLButtonElement;
    protected cardListElement: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.sumElement = ensureElement<HTMLElement>('.basket__price', container);
        this.orderButton = ensureElement<HTMLButtonElement>('.basket__button', container);
        this.cardListElement = ensureElement<HTMLElement>('.basket__list', container);

        this.orderButton.addEventListener('click', () => events.emit('order:start'));
    }

    set sum(value: number) {
        this.sumElement.textContent = `${value} синапсов`;
    }

    set items(items: HTMLElement[]) {
        this.cardListElement.innerHTML = '';
        items.forEach(item => this.cardListElement.appendChild(item));
    }

    set disableOrderButton(value: boolean) {
        this.disable(this.orderButton, value);
    }
}