import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { FormData } from "../../types";

export class Form<T> extends Component<FormData & T> {
    protected submitButtonElement: HTMLButtonElement;
    protected errorsElement: HTMLElement;

    constructor(container: HTMLElement, actions?: { onSubmitClick: () => void }) {
        super(container);
        this.submitButtonElement = ensureElement<HTMLButtonElement>('.button', container);
        this.errorsElement = ensureElement<HTMLElement>('.form__errors', container);

        if (actions?.onSubmitClick) {
            this.submitButtonElement.addEventListener('click', actions.onSubmitClick);
        }
    }

    set errors(errors: string[]) {
        this.errorsElement.innerHTML = '';
        this.errorsElement.textContent = errors.join('\n');
    }

    set isValid(value: boolean) {
        if (value) {
            this.submitButtonElement.disabled = false;
        } else {
            this.submitButtonElement.disabled = true;
        }
    }
}