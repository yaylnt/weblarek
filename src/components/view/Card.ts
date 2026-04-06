import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { CardData } from "../../types";

export class Card<T> extends Component<CardData & T> {
    protected nameElement: HTMLElement;
    protected priceElement: HTMLElement;
    protected _id: string = '';

    constructor(container: HTMLElement) {
        super(container);
        this.nameElement = ensureElement<HTMLElement>('.card__title', container);
        this.priceElement = ensureElement<HTMLElement>('.card__price', container);
    }

    set name(name: string) {
        this.nameElement.textContent = name;
    }

    set price(value: number) {
        this.priceElement.textContent = value ? `${value} синапсов` : 'Бесценно';
    }

    set id(value: string) {
        this._id = value;
    }
}