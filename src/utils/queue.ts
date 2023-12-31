class Queue{
    private queue: string[] = [];
    private size = 0;

    constructor(){
        this.queue = [];
        this.size = 0;
    }
    getQueue(){
        return this.queue;
    }
    enqueue(val: string){
        this.queue.push(val);
        this.size += 1;
    }
    dequeue(): string{
        const ele = this.queue.shift() as string;
        this.size -= 1;
        return ele;
    }
    tailVal(): string{
        return this.queue[this.size-1];
    }
    isEmpty(){
        return this.size === 0;
    }
    clear(){
        this.queue = [];
        this.size = 0;
    }
}

export default Queue;