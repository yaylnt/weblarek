import { Card } from "../Card";
import { ensureElement } from "../../../utils/utils";
import { CardPreviewData } from "../../../types";

export class CardPreview extends Card<CardPreviewData> {
    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLElement;
    protected descriptionElement: HTMLElement;
    protected addButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: { onAddClick?: () => void }) {
        super(container);
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', container);
        this.categoryElement = ensureElement<HTMLElement>('.card__category', container);
        this.descriptionElement = ensureElement<HTMLElement>('.card__text', container);
        this.addButton = ensureElement<HTMLButtonElement>('.card__button', container);

        if (actions?.onAddClick) {
            this.addButton.addEventListener('click', actions.onAddClick);
        }
    }

    set image(src: string) {
        this.setImage(this.imageElement, src, this.nameElement.textContent);
    }

    set category(category: string) {
        this.categoryElement.textContent = category;
    }

    set description(description: string) {
        this.descriptionElement.textContent = description;
    }
}