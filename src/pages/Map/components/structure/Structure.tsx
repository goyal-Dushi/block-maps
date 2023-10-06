import React from "react";
import './Structure.scss';
import { StructureArrangement } from "../blockMap/type";

interface StructureProps extends StructureArrangement {
    classes?: string;
}

export const STRUCTURE_SET = new Set(["residential", "medical", "pg", "rent", "gym", "park", "none", "commercial"]);
export type StructureTypes = "residential" | "medical" | "pg" | "rent" | "gym" | "park" | "none" | "commercial";

const Structure: React.FC<StructureProps> = (props) => {

    const { type = 'residential', structureNo = '', classes, entryPnt } = props;

    return (
        <div className={`structure structure-${type} ${entryPnt ? `structure-${type}_${entryPnt}` : ''} d-flex align-items-center justify-content-center ${classes}`}>
            <>
                <span className={`structure-${type}_text`}> {structureNo} </span>
            </>
        </div>
    )
}

export default Structure;