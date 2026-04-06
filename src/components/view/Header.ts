import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";
import { HeaderData } from "../../types";

export class Header extends Component<HeaderData> {
    protected basketButton: HTMLButtonElement;
    protected counterElement: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.basketButton = ensureElement<HTMLButtonElement>('.header__basket', container);
        this.counterElement = ensureElement<HTMLElement>('.header__basket-counter', container);

        this.basketButton.addEventListener('click', () => events.emit('basket:click'));
    }

    set counter(count: number) {
        this.counterElement.textContent = String(count);
    }
}