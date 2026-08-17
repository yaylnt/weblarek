import { Card } from "../Card";
import { ensureElement } from "../../../utils/utils";
import { categoryMap } from "../../../utils/constants";
import { CardCatalogData, ICatalogActions } from "../../../types";

export class CardCatalog extends Card<CardCatalogData> {
    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLElement;
    protected catalogButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: ICatalogActions) {
        super(container);
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', container);
        this.categoryElement = ensureElement<HTMLElement>('.card__category', container);
        this.catalogButton = container as HTMLButtonElement;

        if (actions?.onSelect) {
            this.catalogButton.addEventListener('click', () => actions.onSelect());
        }
    }

    set image(src: string) {
        this.setImage(this.imageElement, src, this.nameElement.textContent ?? undefined);
    }

    set category(category: string) {
        this.categoryElement.textContent = category;
        this.updateCategoryModifier(category);
    }

    protected updateCategoryModifier(category: string) {
        const modifiers = Object.values(categoryMap);
        this.categoryElement.classList.remove(...modifiers);
        const modifier = categoryMap[category as keyof typeof categoryMap] ?? 'card__category_other';
        this.categoryElement.classList.add(modifier);
    }
}