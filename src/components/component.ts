export interface IComponent {
  attachTo(parent: HTMLElement, position: InsertPosition): void;
}

export class Component<T extends HTMLElement> implements IComponent {
  protected readonly element: T;
  constructor(htmlText: string) {
    const template = document.createElement("template");
    template.innerHTML = htmlText;
    this.element = template.content.firstElementChild! as T;
  }

  attachTo(parent: HTMLElement, position: InsertPosition = "afterbegin") {
    parent.insertAdjacentElement(position, this.element);
  }
}
