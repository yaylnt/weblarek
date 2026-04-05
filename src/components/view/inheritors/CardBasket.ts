import { Card } from "../Card";
import { ensureElement } from "../../../utils/utils";
import { CardBasketData } from "../../../types";

export class CardBasket extends Card<CardBasketData> {
    protected indexElement: HTMLElement;
    protected deleteButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: { onDeleteClick?: () => void }) {
        super(container);
        this.indexElement = ensureElement<HTMLElement>('.basket__item-index', container);
        this.deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', container);

        if (actions?.onDeleteClick) {
            this.deleteButton.addEventListener('click', actions.onDeleteClick);
        }
    }

    set index(index: number) {
        this.indexElement.textContent = String(index);
    }
}