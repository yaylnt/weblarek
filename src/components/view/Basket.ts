import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { BasketData } from "../../types";

export class Basket extends Component<BasketData> {
    protected sumElement: HTMLElement;
    protected orderButton: HTMLButtonElement;
    protected cardListElement: HTMLElement;

    constructor(container: HTMLElement, actions?: { onOrderClick: () => void }) {
        super(container);
        this.sumElement = ensureElement<HTMLElement>('.basket__price', container);
        this.orderButton = ensureElement<HTMLButtonElement>('.basket__button', container);
        this.cardListElement = ensureElement<HTMLElement>('.basket__list', container);

        if (actions?.onOrderClick) {
            this.orderButton.addEventListener('click', actions.onOrderClick);
        }
    }

    set sum(value: number) {
        this.sumElement.textContent = `${value} синапсов`;
    }

    set cards(items: HTMLElement[]) {
        this.cardListElement.innerHTML = '';
        items.forEach(item => this.cardListElement.appendChild(item));
    }
}