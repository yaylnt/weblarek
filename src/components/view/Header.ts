import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { HeaderData } from "../../types";

export class Header extends Component<HeaderData> {
    protected basketButton: HTMLButtonElement;
    protected counterElement: HTMLElement;

    constructor(container: HTMLElement, actions?: { onBasketClick: () => void }) {
        super(container);
        this.basketButton = ensureElement<HTMLButtonElement>('.header__basket', container);
        this.counterElement = ensureElement<HTMLElement>('.header__basket-counter', container);

        if (actions?.onBasketClick) {
            this.basketButton.addEventListener('click', actions.onBasketClick);
        }
    }

    set counter(count: number) {
        this.counterElement.textContent = String(count);
    }
}