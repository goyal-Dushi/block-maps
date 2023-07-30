import { Arrangement, Dimension, RoadArrangement } from "../maps/components/BlockMap"
import { StructureSet } from "../maps/components/Structure";
import { DblockConfig } from "../maps/sector27/Dblock";
import MaxHeap from "./maxHeap";

type MatrixType = { isPath: boolean, houseNo?: Set<number> }[][];
type BlockDict = Record<number, [[number, number]]>;

const adjacencyMatrix = (arrangement: Arrangement,dimensions: Dimension) => {

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
        adjacencyDict: blockIndDict
    };
}

export type PathObj = {
    len: number,
    path: Array<[number, number]>
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

function sortObjectByKeys(pathDict: Record<number, number[][]>) {
    const keysArray = Object.keys(pathDict).map(Number);

    keysArray.sort((a, b) => a - b);

    const sortedObject: Record<number, number[][]> = {};
    keysArray.forEach((key) => {
        sortedObject[key] = pathDict[key];
    });

    return sortedObject;
}


export const getPaths = (source: number, destn: number, matrix: MatrixType, dictionary: BlockDict) => {
    const sourceCoordinate = dictionary[source];
    const destnCoordinate = dictionary[destn];
    const destCordCnt = destnCoordinate.length;

    const paths: Array<[number, number]> = [[sourceCoordinate[0][0], sourceCoordinate[0][1]]];
    const pathDict: Record<number, number[][]> = {}
    const rows = matrix.length;
    const cols = matrix[0].length;
    const maxHeap = new MaxHeap();

    findPaths(maxHeap,destnCoordinate , destCordCnt, sourceCoordinate[0] ,sourceCoordinate[0][0], sourceCoordinate[0][1], rows, cols, matrix, paths, pathDict);
    maxHeap.clearHeap();

    sortObjectByKeys(pathDict);
    // at max 4 results returned
    const result = Object.keys(pathDict).slice(0, 4).map(key => ({ [key]: pathDict[+key] }));

    return Object.values(result)[0];
}

export const getCordFromStrHash = (path: string) => {
    const numbers = path.split('-');
    const cord1 = parseInt(numbers[0])
    const cord2  = parseInt(numbers[1])
    return [cord1, cord2];
}

export const createCordStrHash = (cord: [number,number]) => {
    const cordStr = cord[0].toString() + '-' + cord[1].toString();
    return cordStr;
}

const cratePathSet = (path: Array<number[]>) => {
    const pathSet = new Set<string>([]);
    path.forEach((val) =>{
        const pathStr = val[0].toString()+'-'+val[1].toString();
        pathSet.add(pathStr);
    })
    return pathSet;
}

export const solve = () =>{
    const rows = DblockConfig.length;
    const cols = DblockConfig[0].length;
    const { matrix, adjacencyDict } = adjacencyMatrix(DblockConfig, { rows, cols });
    const pathSet = cratePathSet(Object.values(getPaths(98, 38, matrix, adjacencyDict))[0]);
    return pathSet;
}