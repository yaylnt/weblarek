import { Card } from "../Card";
import { ensureElement } from "../../../utils/utils";
import { CardCatalogData } from "../../../types";

export class CardCatalog extends Card<CardCatalogData> {
    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLElement;
    protected catalogButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: { onCardClick?: () => void }) {
        super(container);
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', container);
        this.categoryElement = ensureElement<HTMLElement>('.card__category', container);
        this.catalogButton = container as HTMLButtonElement;

        if (actions?.onCardClick) {
            this.catalogButton.addEventListener('click', actions.onCardClick);
        }
    }

    set image(src: string) {
        this.setImage(this.imageElement, src, this.nameElement.textContent);
    }

    set category(category: string) {
        this.categoryElement.textContent = category;
    }
}