class Store {
  constructor(key, storage) {
    this._storage = storage;
    this._storeKey = key;
  }

  getItems(key) {
    const storeKey = `${this._storeKey}/${key}`;
    try {
      return JSON.parse(this._storage.getItem(storeKey)) || {};
    } catch (err) {
      return {};
    }
  }

  setItems(items, key) {
    const storeKey = `${this._storeKey}/${key}`;
    this._storage.setItem(
        storeKey,
        JSON.stringify(items)
    );
  }

  setItem(key, index, value) {
    const storeKey = `${this._storeKey}/${key}`;
    const store = this.getItems(key);

    this._storage.setItem(
        storeKey,
        JSON.stringify(
            Object.assign(
                {},
                store,
                {
                  [index]: value
                }
            )
        )
    );
  }

  removeItem(key) {
    const store = this.getItems();

    delete store[key];

    this._storage.setItem(
        this._storeKey,
        JSON.stringify(store)
    );
  }
}

export default Store;
