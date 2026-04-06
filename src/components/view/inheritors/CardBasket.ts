import { Card } from "../Card";
import { IEvents } from "../../base/Events";
import { ensureElement } from "../../../utils/utils";
import { CardBasketData } from "../../../types";

export class CardBasket extends Card<CardBasketData> {
    protected indexElement: HTMLElement;
    protected deleteButton: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.indexElement = ensureElement<HTMLElement>('.basket__item-index', container);
        this.deleteButton = ensureElement<HTMLButtonElement>('button', container);

        this.deleteButton.addEventListener('click', () => events.emit('card:remove', { id: this._id }));
    }

    set index(index: number) {
        this.indexElement.textContent = String(index);
    }
}