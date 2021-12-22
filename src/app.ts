class Store<T> {
  private storage: Array<T> = [];
  add(item: T) {
    this.storage.push(item);
  }

  delete(item: T) {
    const isExist = this.storage.indexOf(item) >= 0;

    if (!isExist && typeof item === "object") {
      return;
    }

    this.storage.splice(this.storage.indexOf(item), 1);
  }

  get getItem() {
    return this.storage;
  }
}

const s = new Store<object>();
s.add({ name: "a" });
s.add({ name: "a" });
console.log(s.getItem);
s.delete({ name: "a" });
console.log(s.getItem);
