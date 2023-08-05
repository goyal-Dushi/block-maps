import { PathObj } from "./createBlockMatrix";

class MaxHeap {
    private heap: Array<PathObj> = [];
    constructor() {
        this.heap = [];
    }

    // insert element in heap
    insert(path: Array<[number, number]>) {
        const pathLen = path.length;
        const pathObj: PathObj = { len: pathLen, path };
        this.heap.push(pathObj);

        this.heapifyAfterInsert();
    }

    private heapifyAfterInsert() {
        const heapLen = this.heap.length;
        let i = heapLen - 1;
        while (i >= 1 && (this.heap[Math.floor((i - 1) / 2)].len < this.heap[i].len)) {
            this.swap(Math.floor((i - 1 / 2)), i);
            i = Math.floor((i - 1) / 2)
        }
    }

    // return current heap size
    heapSize(){
        return this.heap.length;
    }

    // check if heap is empty
    isEmpty(){
        return this.heap.length === 0;
    }

    // clear heap, empty heap
    clearHeap() {
        this.heap.splice(0);
    }

    // return max in heap, but , only for 
    // checking purpose , not remove from heap
    getHeapTop(): PathObj {
        return this.heap[0];
    }

    // return max path len and remove from heap
    getHeapMaxPath() {
        const maxHeap = JSON.parse(JSON.stringify(this.heap[0])) as PathObj;
        const heapLen = this.heap.length;
        this.swap(0, heapLen - 1);
        this.heap.pop();
        this.heapifyAfterRemove();
        return maxHeap
    }

    private heapifyAfterRemove() {
        const heapLen = this.heap.length;
        let i = 0;
        while ((2 * i + 1) < heapLen) {
            const leftChild: number = (2 * i) + 1;
            const rightChild: number = (2 * i) + 2;
            let currMax: PathObj = { len: 0, path: [] };

            // Compare lengths in the opposite way to achieve max heap
            if (rightChild < heapLen) {
                currMax = this.findMax(this.heap[i], this.heap[leftChild], this.heap[rightChild]);
            } else {
                currMax = this.findMax(this.heap[i], this.heap[leftChild], currMax);
            }

            if (currMax.len === this.heap[i].len) { 
                break;
            } else if (currMax.len === this.heap[leftChild].len) {
                this.swap(leftChild, i);
                i = leftChild;
            } else {
                this.swap(rightChild, i);
                i = rightChild;
            }
        }
    }

    // utility functions 
    private findMax(obj1: PathObj, Obj2: PathObj, obj3: PathObj): PathObj {
        const arr = [obj1, Obj2, obj3];

        // since at max, only 3 objects, so 3log(3) == constant
        arr.sort((a: PathObj, b: PathObj) => b.len - a.len);

        return arr[0];
    }

    private swap(indexOne: number, indexTwo: number) {
        const temp = this.heap[indexOne];
        this.heap[indexOne] = this.heap[indexTwo];
        this.heap[indexTwo] = temp;
    }
}

export default MaxHeap;