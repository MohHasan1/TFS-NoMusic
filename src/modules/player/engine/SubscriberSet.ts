class SubscriberSet<T> {
  private set = new Set<Subscriber<T>>();

  add(cb: Subscriber<T>) {
    this.set.add(cb);
    return () => {
      this.set.delete(cb);
    };
  }

  emit(value: T) {
    this.set.forEach((cb) => {
      cb(value);
    });
  }
}

export type Subscriber<T> = (value: T) => void;

export default SubscriberSet;
