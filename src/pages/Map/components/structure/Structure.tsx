import React from "react";
import './Structure.scss';
import { StructureArrangement } from "../blockMap/type";

interface StructureProps extends StructureArrangement {
    classes?: string;
}

export const STRUCTURE_SET = new Set(["residential", "medical", "pg", "rent", "gym", "park", "none", "commercial", "plant"]);
export type StructureTypes = "residential" | "medical" | "pg" | "rent" | "gym" | "park" | "none" | "commercial" | "plant";

const Structure: React.FC<StructureProps> = (props) => {

    const { type = 'residential', structureNo = '', classes, entryPnt, business } = props;

    const handleStructureClick = () => {
        if(business){
            // open relevant web page
            console.log('opening web page');
        }
    };

    return (
        <div onClick={handleStructureClick} data-bs-target="#structureCanvas" data-bs-toggle="offcanvas" className={`structure structure-${business || type} ${entryPnt ? `structure-${type}_${entryPnt}` : ''} d-flex align-items-center justify-content-center ${classes}`}>
            <>
                <span className={`structure-text ${type}_text`}> {structureNo} </span>
            </>
        </div>
    )
}

export default Structure;