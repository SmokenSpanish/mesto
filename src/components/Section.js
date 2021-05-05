export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = containerSelector;
    }

    setItems(items) {
        this._items = items;
    }

    renderItems() {
        this._items.forEach((item) => {
            this.addItem(item);
        });
    }

    addItem(element) {
        this._container.prepend(this._renderer(element));
    }

}