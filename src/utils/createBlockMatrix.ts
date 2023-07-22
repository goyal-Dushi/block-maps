import { Arrangement, Dimension, RoadArrangement } from "../maps/components/BlockMap"
import { StructureSet } from "../maps/components/Structure";
import { DblockConfig } from "../maps/sector27/Dblock";

type MatrixType = { isPath: boolean, houseNo?: Set<number> }[][];
type BlockDict = Record<number, [[number, number]]>;

const blockMatrix = (arrangement: Arrangement,dimensions: Dimension) => {

    const matrix: MatrixType = [];
    const blockIndDict: BlockDict = {};

    for(let i=0; i< dimensions.rows;i++){
        matrix[i] = [];
        const cols = arrangement[i].length;
        for(let j=0;j<cols;j++){
            const arrObj = arrangement[i][j];

            // // if undefined, return
            if(!arrObj){
                j += 1
                continue
            }
            // structure , assign 0
            if(StructureSet.has(arrObj.type)){
                if(arrObj.x){
                    const totalX = j+ arrObj.x;
                    let k = j;
                    while(k < totalX){
                        matrix[i].push({ isPath: false, houseNo: new Set([-1]) });
                        k++;
                    }
                } else{
                    matrix[i].push({ isPath: false, houseNo: new Set([-1]) });
                    
                }
                continue;
            }
            // if road / service lane 
            else {
                matrix[i].push({ isPath: true });
                const roadHash = (arrObj as RoadArrangement)?.roadHash;
                if (roadHash?.size) {
                    matrix[i][j] = { ...matrix[i][j], houseNo: roadHash };
                    roadHash.forEach((hash) => {
                        if(!blockIndDict[hash]){
                            blockIndDict[hash] = [[i,j]];
                        }else{
                            blockIndDict[hash].push([i, j]);
                        }
                    })
                }
            }
        }
    }
    return {
        matrix, 
        blockDict: blockIndDict
    };
}

type PathObj = {
    len: number,
    path: Array<[number, number]>
}

class MaxHeap{
    private heap: Array<PathObj> = [];
    constructor(){
        this.heap = [];
    }

    insert(path: Array<[number, number]>){
        const pathLen = path.length;
        const pathObj: PathObj = { len: pathLen, path };
        this.heap.push(pathObj);

        this.heapifyAfterInsert();
    }

    clearHeap(){
        this.heap.splice(0);
    }

    getHeapTop(): PathObj{
        return this.heap[0];
    }

    getHeapMax(){
        const maxHeap = JSON.parse(JSON.stringify(this.heap[0])) as PathObj;
        const heapLen = this.heap.length;
        this.swap(0, heapLen-1);
        this.heap.pop();
        this.heapifyAfterRemove();
        return maxHeap
    }

    private heapifyAfterInsert(){
        const heapLen = this.heap.length;
        let i = heapLen-1;
        while(i >= 1 && (this.heap[Math.floor((i-1)/2)].len < this.heap[i].len)){
            this.swap(Math.floor((i-1/2)), i);
            i = Math.floor((i-1)/2)
        }
    }

    private findMax(obj1: PathObj, Obj2:PathObj, obj3:PathObj):PathObj{
        const arr = [obj1, Obj2, obj3];

        // since at max, only 3 objects, so 3log(3) == constant
        arr.sort((a: PathObj, b: PathObj) => b.len - a.len);

        return arr[0];
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

            if (currMax.len === this.heap[i].len) { // Compare using strict equality
                break;
            } else if (currMax.len === this.heap[leftChild].len) { // Compare using strict equality
                this.swap(leftChild, i);
                i = leftChild;
            } else {
                this.swap(rightChild, i);
                i = rightChild;
            }
        }
    }

    private swap(indexOne: number, indexTwo:number) {
        const temp = this.heap[indexOne];
        this.heap[indexOne] = this.heap[indexTwo];
        this.heap[indexTwo] = temp;
    }
}

// DFS : DEPTH FIRST SEARCH
function findPaths(maxHeap: MaxHeap, dest: [number, number][], destCnt: number, source: number[], x: number, y: number, rows: number, cols: number, matrix: MatrixType, path: Array<[number, number]>, pathDict: Record<number, number[][]>): void {

    if (dest.some(([dx, dy]) => dx === x && dy === y)) {
        if (!pathDict[path.length]) {
            pathDict[path.length] = path.slice();
        }
        return;
    }

    const dx = [-1, 0, 1, 0];
    const dy = [0, -1, 0, 1];

    for (let k = 0; k < 4; k++) {
        const cordX = x + dx[k];
        const cordY = y + dy[k];
        if (cordX === source[0] && cordY === source[1]) {
            continue;
        }

        if (cordX >= 0 && cordX < rows && cordY >= 0 && cordY < cols && matrix[cordX][cordY].isPath && !matrix[cordX][cordY]?.houseNo?.has(-1)) {
            path.push([cordX, cordY]);
            matrix[cordX][cordY].isPath = false;
            const newPath = path.slice();
            findPaths(maxHeap, dest, destCnt, source, cordX, cordY, rows, cols, matrix, newPath, pathDict);
            matrix[cordX][cordY].isPath = true;
            path.pop();
        }
    }
}


export const getPaths = (source: number, destn: number, matrix: MatrixType, dictionary: BlockDict) => {
    const sourceCoordinate = dictionary[source];
    const destnCoordinate = dictionary[destn];
    const destCordCnt = destnCoordinate.length;

    const paths: Array<[number, number]> = [];
    const pathDict: Record<number, number[][]> = {}
    const rows = matrix.length;
    const cols = matrix[0].length;
    const maxHeap = new MaxHeap();
    console.log('destn cord: ', destnCoordinate, ' src cord:', sourceCoordinate[0]);
    findPaths(maxHeap, destnCoordinate, destCordCnt, sourceCoordinate[0] ,sourceCoordinate[0][0], sourceCoordinate[0][1], rows, cols, matrix, paths, pathDict);
    // maxHeap.clearHeap();
    console.log(pathDict);
    // maxHeap.clearHeap();
}

export const solve = () =>{
    const rows = DblockConfig.length;
    const cols = DblockConfig[0].length;
    console.log('rows: ', rows, ' cols: ', cols);
    const { matrix, blockDict } = blockMatrix(DblockConfig, { rows, cols });
    // console.log(blockDict);
    getPaths(107, 10, matrix, blockDict);
}