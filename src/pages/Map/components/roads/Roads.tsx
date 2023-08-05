import React from "react";
import './Roads.scss';
import LocatorSrc from '../../../../assets/locator_green.png';
import LocatorDestn from '../../../../assets/locator_green.png';

interface RoadsProps {
    type: RoadType;
    x?: number;
    y?: number;
    classes?: string;
    isSrc: boolean;
    isDestn: boolean;
}

export const ROAD_SET = new Set<string>(["service", "main"]);
export type RoadType = "service" | "main";

const Roads: React.FC<RoadsProps> = (props) => {

    const { type, x = 1, y = 1, classes, isSrc, isDestn } = props;

    return (
        <div style={{ width: `${x * 50}px`, height: `${y * 50}px` }} className={`road road__${type} ${classes}`} >
            {(isSrc || isDestn) && (
                <div className="locator">
                    <img src={isSrc ? LocatorSrc : LocatorDestn} className="mb-4" alt="locator" height={60} />
                </div>
            )}

            <span className="stripe" ></span>
        </div>
    )
}

export default Roads;