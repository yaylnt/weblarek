import { Component } from "../base/Component";
import { GalleryData } from "../../types";

export class Gallery extends Component<GalleryData> {
    protected catalogElement: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        this.catalogElement = container;
    }

    set catalog (items: HTMLElement[]) {
        this.catalogElement.innerHTML = '';
        items.forEach(item => this.catalogElement.appendChild(item));
    }   
}