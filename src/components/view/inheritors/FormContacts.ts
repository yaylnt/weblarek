import { Form } from "../Form";
import { ensureElement } from "../../../utils/utils";
import { ContactsData } from "../../../types";
import { IEvents } from "../../base/Events";

export class FormContacts extends Form<ContactsData> {
    protected emailElement: HTMLInputElement;
    protected phoneElement: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
        this.emailElement = ensureElement<HTMLInputElement>('[name="email"]', container);
        this.phoneElement = ensureElement<HTMLInputElement>('[name="phone"]', container);

        this.container.addEventListener('submit', (e) => {
            e.preventDefault();
            events.emit('contacts:submit');
        });
        this.container.addEventListener('input', () => events.emit('contacts:change', { email: this.emailElement.value, phone: this.phoneElement.value }));
    }
}
