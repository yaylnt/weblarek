import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";
import { SuccessData } from "../../types";

export class SuccessOrder extends Component<SuccessData> {
    protected successButton: HTMLButtonElement;
    protected sumElement: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.successButton = ensureElement<HTMLButtonElement>('.order-success__close', container);
        this.sumElement = ensureElement<HTMLElement>('.order-success__description', container);

        this.successButton.addEventListener('click', () => events.emit('success:close'));
    }

    set sum(sum: number) {
        this.sumElement.textContent = `Списано ${sum} синапсов`;
    }
}