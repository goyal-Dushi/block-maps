import React from "react";
import Structure, { StructureSet, StructureTypes } from "./Structure";
import Roads, { RoadType } from "./Roads";
import { createCordStrHash } from "../../utils/createBlockMatrix";

export interface BlockMapProps {
    arrangement:Arrangement;
    dimension: Dimension;
    path?: Set<string>;
}

export type Dimension = { cols: number, rows: number };

export type StructureArrangement = {
    type: StructureTypes;
    structureNo?: string;
    x?: number;
    y?: number;
}

export type RoadArrangement = {
    type: RoadType;
    rotn?: string;
    roadHash?: Set<number>;
    matrix_x?: number;
    matrix_y?: number;
    x?: number;
    y?: number;
}

export type Arrangement = (StructureArrangement| RoadArrangement)[][];

const STUCTURE_TYPE_SET = StructureSet;
const ROAD_TYPE_SET = new Set(["service", "main"])

const BlockMap: React.FC<BlockMapProps> = (props) => {
    const { arrangement, dimension, path} = props;
    return(
        <>
            <div className="container" style={{ width: `${dimension.cols*50}px`, height: `${dimension.rows*50}px` }}>
                {arrangement.map((arrRow, rowInd) => {
                    let cordY = -1;
                    return(
                        <div className="row" key={rowInd}>
                            {arrRow.map((block, colInd) => {
                                cordY += 1;
                                const { type, x } = block;
                                if(x){
                                    cordY += (x-1);
                                }
                                if (STUCTURE_TYPE_SET.has(type)){

                                    const { structureNo } = block as StructureArrangement;

                                    return (
                                        <Structure key={`${type}-${structureNo}-${colInd}`} {...block} type={type as StructureTypes} structureNo={structureNo} />
                                    )
                                }
                                let activePath = '';
                                const cordHash = createCordStrHash([rowInd, cordY]);
                                if(path){
                                    if (path.has(cordHash)){
                                        activePath = 'road--included';
                                    }else{
                                        activePath = 'road-excluded';
                                    }
                                }
                                if (ROAD_TYPE_SET.has(type)){

                                    return (
                                        <Roads key={`${type}-${colInd}`} classes={activePath} {...block} type={type as RoadType} />
                                    )
                                }
                                
                                return null;
                            })}
                        </div>    
                    )
                })}
            </div>
        </>
    )
}

export default BlockMap;
