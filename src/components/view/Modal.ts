import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";
import { ModalData } from "../../types";

export class Modal extends Component<ModalData> {
    protected closeButton: HTMLButtonElement;
    protected contentElement: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
        this.contentElement = ensureElement<HTMLElement>('.modal__content', container);

        this.closeButton.addEventListener('click', () => this.close());
        this.container.addEventListener('click', (event) => {
        if (event.target === this.container) {
            this.close();
        }
        });
    }

    set content(content: HTMLElement) {
        this.contentElement.innerHTML = '';
        this.contentElement.appendChild(content);
    }

    open() {
		this.container.classList.add('modal_active');
	}

	close() {
		this.container.classList.remove('modal_active');
	}
}