import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";
import { FormData } from "../../types";

export class Form<T> extends Component<FormData & T> {
    protected submitButtonElement: HTMLButtonElement;
    protected errorsElement: HTMLElement;

    constructor(container: HTMLFormElement, protected events: IEvents) {
        super(container);
        this.submitButtonElement = ensureElement<HTMLButtonElement>('button[type="submit"]', container);
        this.errorsElement = ensureElement<HTMLElement>('.form__errors', container);
    }

    set errors(errors: string[]) {
        this.errorsElement.innerHTML = '';
        this.errorsElement.textContent = errors.join(', ');
    }

    set isValid(value: boolean) {
        if (value) {
            this.disable(this.submitButtonElement, false);
        } else {
            this.disable(this.submitButtonElement, true);
        }
    }

    validationState(errors: Array<string | undefined>) {
    const actualErrors = errors.filter(Boolean) as string[];
    this.errors = actualErrors;
    this.isValid = actualErrors.length === 0;
    }
}