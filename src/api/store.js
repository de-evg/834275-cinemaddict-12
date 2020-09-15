class Store {
  constructor(key, storage) {
    this._storage = storage;
    this._key = key;
    this._syncKey = `${this._key}-need-sync`;
    this._updateKey = `${this._key}-to-update`;
  }

  getItems(key = this._key) {
    try {
      return JSON.parse(this._storage.getItem(key)) || {};
    } catch (err) {
      return {};
    }
  }

  getItem(key) {
    const store = this.getItems();

    return store[key];
  }

  setItems(items) {
    this._storage.setItem(
        this._key,
        JSON.stringify(items)
    );
  }

  getUpdateKey() {
    return this._updateKey;
  }

  setUpdatedItem(key, value) {
    const store = this.getItems(this._updateKey);

    this._storage.setItem(
        this._updateKey,
        JSON.stringify(
            Object.assign(
                {},
                store,
                {
                  [key]: value
                }
            )
        )
    );
  }

  resetUpdateStore() {
    this._storage.setItem(
        this._updateKey,
        JSON.stringify({})
    );
  }

  setItem(key, value) {
    const store = this.getItems();

    this._storage.setItem(
        this._key,
        JSON.stringify(
            Object.assign(
                {},
                store,
                {
                  [key]: value
                }
            )
        )
    );
  }

  switchSyncFlagOn() {
    this._storage.setItem(
        this._syncKey,
        JSON.stringify(true)
    );
  }

  switchSyncFlagOff() {
    this._storage.setItem(
        this._syncKey,
        JSON.stringify(false)
    );
  }

  getSyncFlag() {
    return JSON.parse(this._storage.getItem(this._syncKey)) || false;
  }
}

export default Store;
