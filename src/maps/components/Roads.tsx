import React from "react";
import './Roads.scss';

export interface RoadsProps {
    type: RoadType;
    x?: number;
    y?: number;
}

export type RoadType = "service" | "main";

const Roads: React.FC<RoadsProps> = (props) => {

    const { type, x=1, y=1 } = props;

    return(
        <div style={{ width: `${x * 50}px`, height: `${y * 50}px` }} className={`road road__${type}`} >
            <span className="stripe" ></span>
        </div>
    )
}

export default Roads;