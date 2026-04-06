import { Card } from "../Card";
import { IEvents } from "../../base/Events";
import { ensureElement } from "../../../utils/utils";
import { categoryMap } from "../../../utils/constants";
import { CardPreviewData } from "../../../types";

export class CardPreview extends Card<CardPreviewData> {
    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLElement;
    protected descriptionElement: HTMLElement;
    protected addButton: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', container);
        this.categoryElement = ensureElement<HTMLElement>('.card__category', container);
        this.descriptionElement = ensureElement<HTMLElement>('.card__text', container);
        this.addButton = ensureElement<HTMLButtonElement>('.card__button', container);

        this.addButton.addEventListener('click', () => events.emit('card:add', { id: this._id }));
    }

    set image(src: string) {
        this.setImage(this.imageElement, src, this.nameElement.textContent);
    }

    set category(category: string) {
        this.categoryElement.textContent = category;
        this.updateCategoryModifier(category);
    }

    set description(description: string) {
        this.descriptionElement.textContent = description;
    }

    protected updateCategoryModifier(category: string) {
        const modifiers = Object.values(categoryMap);
        this.categoryElement.classList.remove(...modifiers);
        const modifier = categoryMap[category as keyof typeof categoryMap] ?? 'card__category_other';
        this.categoryElement.classList.add(modifier);
    }
}