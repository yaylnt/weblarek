import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { ModalData } from "../../types";

export class Modal extends Component<ModalData> {
    protected closeButton: HTMLButtonElement;
    protected contentElement: HTMLElement;

    constructor(container: HTMLElement, protected actions?: { onClose: () => void, onOpen: () => void }) {
        super(container);
        this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
        this.contentElement = ensureElement<HTMLElement>('.modal__content', container);

        if (actions?.onClose) {
            this.closeButton.addEventListener('click', this.close.bind(this));
        }
    }

    set content(content: HTMLElement) {
        this.contentElement.innerHTML = '';
        this.contentElement.appendChild(content);
    }

    open() {
		this.container.classList.add('modal_active');
		this.actions?.onOpen();
	}

	close() {
		this.container.classList.remove('modal_active');
		this.contentElement.textContent = null;
		this.actions?.onClose();
	}
}