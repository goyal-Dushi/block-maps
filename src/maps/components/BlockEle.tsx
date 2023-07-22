import React from "react";
import Structure, { StructureTypes } from "./Structure";
import Roads, { RoadType } from "./Roads";

export interface BlockEleProps {
    type: StructureTypes | RoadType;
    structureClasses?: string;
    roadClasses?: string;
}

const STUCTURE_TYPE_SET = new Set(["residential" , "medical" , "pg" , "rent" , "gym" , "none"])
const ROAD_TYPE_SET = new Set(["service", "main"])

const BlockEle: React.FC<BlockEleProps> = (props) => {
    const { type } = props;
    if (STUCTURE_TYPE_SET.has(type)){
        return(
            <Structure {...props} type={type as StructureTypes} />
        )
    }

    if(ROAD_TYPE_SET.has(type)){
        return(
            <Roads {...props} type={type as RoadType} />
        )
    }

    return null;
}

export default BlockEle;