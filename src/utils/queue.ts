interface MNode<T> {
  data: T | null;
  next: MNode<T> | null;
}

class Queue<T> {
  private queueHead: MNode<T> | null;
  private queueTail: MNode<T> | null;
  private size: number;

  constructor() {
    this.queueHead = null;
    this.queueTail = null;
    this.size = 0;
  }

  enqueue(val: T) {
    const newNode = { data: val, next: null };

    if (!this.queueHead) {
      this.queueHead = newNode;
      this.queueTail = newNode;
      this.size += 1;
      return;
    }

    (this.queueTail as MNode<T>).next = newNode;
    this.size += 1;
    this.queueTail = (this.queueTail as MNode<T>).next;
  }

  dequeue(): T | null {
    if (this.size === 0 && !this.queueHead) {
      return null;
    }

    const ele = (this.queueHead as MNode<T>).data;
    this.queueHead = (this.queueHead as MNode<T>).next;
    this.size -= 1;
    return ele;
  }

  isEmpty() {
    return this.size === 0;
  }

  clear() {
    this.queueHead = { data: null, next: null };
    this.queueTail = { data: null, next: null };
    this.size = 0;
  }
}

export default Queue;
