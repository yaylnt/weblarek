import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { SuccessData } from "../../types";

export class SuccessOrder extends Component<SuccessData> {
    protected successButton: HTMLButtonElement;
    protected sumElement: HTMLElement;

    constructor(container: HTMLElement, protected actions?: { onSuccessClick: () => void }) {
        super(container);
        this.successButton = ensureElement<HTMLButtonElement>('.order-success__close', container);
        this.sumElement = ensureElement<HTMLElement>('.order-success__description', container);

        if (actions?.onSuccessClick) {
            this.successButton.addEventListener('click', actions.onSuccessClick);
        }
    }

    set sum(sum: number) {
        this.sumElement.textContent = `Списано ${sum} синапсов`;
    }
}