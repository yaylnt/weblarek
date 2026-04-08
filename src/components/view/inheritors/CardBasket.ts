import { Card } from "../Card";
import { ensureElement } from "../../../utils/utils";
import { ICardActions, CardBasketData } from "../../../types";

export class CardBasket extends Card<CardBasketData> {
    protected indexElement: HTMLElement;
    protected deleteButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container);
        this.indexElement = ensureElement<HTMLElement>('.basket__item-index', container);
        this.deleteButton = ensureElement<HTMLButtonElement>('button', container);
        if (actions?.onDelete) {
            this.deleteButton.addEventListener('click', actions.onDelete);
        }
    }

    set index(index: number) {
        this.indexElement.textContent = String(index);
    }
}