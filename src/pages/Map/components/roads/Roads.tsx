import React, { useRef, useEffect } from "react";
import './Roads.scss';
import LocatorSrc from '../../../../assets/locator_red.png';
import LocatorDestn from '../../../../assets/locator_red.png';
import { RoadArrangement } from "../blockMap/type";

interface RoadsProps extends RoadArrangement {
    classes?: string;
    isSrc: boolean;
    isDestn: boolean;
    getStructureRef: (ref: React.MutableRefObject<HTMLDivElement | null>, type: "src" | "destn") => void;
}

export const ROAD_SET = new Set<string>(["service", "main"]);
export type RoadType = "service" | "main";

const Roads: React.FC<RoadsProps> = (props) => {

    const { type, classes, isSrc, isDestn, rotn, getStructureRef } = props;
    const roadRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (isSrc) {
            getStructureRef(roadRef, "src");
        } else if(isDestn){
            getStructureRef(roadRef, 'destn');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSrc, isDestn]);

    return (
        <div ref={roadRef} className={`road road__${type} ${classes}`} >
            {(isSrc || isDestn) && (
                <div className="locator">
                    <img src={isSrc ? LocatorSrc : LocatorDestn} className="mb-4" alt="locator" height={60} />
                </div>
            )}

            <span className={`stripe ${rotn ? 'stripe--vertical' : ''}`} ></span>
        </div>
    )
}

export default Roads;