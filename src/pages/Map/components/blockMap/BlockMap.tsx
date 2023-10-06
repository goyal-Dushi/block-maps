import React, { useLayoutEffect, useState } from "react";
import Structure, { STRUCTURE_SET, StructureTypes } from "../structure/Structure";
import Roads, { ROAD_SET, RoadType } from "../roads/Roads";
import { createCordStrHash } from "../../../../utils/createBlockMatrix";
import { Arrangement, Dimension, RoadArrangement, StructureArrangement } from "./type";
import Actions from "../actions/Actions";

export interface BlockMapProps {
    arrangement: Arrangement;
    dimension: Dimension;
    path?: Set<string>;
    type?: StructureTypes;
    src?: string;
    destn?: string;
}

const BlockMap: React.FC<BlockMapProps> = (props) => {
    const { arrangement, dimension, path, type: paramType, src, destn } = props;
    const [strtRef, setStrtRef] = useState<React.MutableRefObject<HTMLDivElement | null>
    >();
    const [zoom, setZoom] = useState(1.0);

    const getRef = (ref: React.MutableRefObject<HTMLDivElement | null>) => {
        ref.current?.scrollIntoView({
            behavior: 'smooth',
        });
        setStrtRef(ref);
    };

    const handleZoomIn = () => {
        if (+zoom.toFixed(1) === 1.5) {
            return;
        }
        setZoom((prev) => {
            return prev + 0.1;
        });
    };

    const handleZoomOut = () => {
        if (zoom === 1.0) {
            return;
        }
        setZoom((prev) => {
            return prev - 0.1;
        });
    };

    const handleRecenter = () => {
        if(strtRef){
            getRef(strtRef);
        }
    }

    useLayoutEffect(() => {
        if (strtRef) {
            getRef(strtRef);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [zoom]);

    return (
        <>
            <div className="container-xl map" style={{ width: `${dimension.cols * 50}px`, height: `${dimension.rows * 50}px`, zoom: zoom }}>
                {arrangement.map((arrRow, rowInd) => {
                    let cordY = -1;
                    return (
                        <div className="row" key={rowInd}>
                            {arrRow.map((block, colInd) => {
                                cordY += 1;
                                const { type } = block;

                                if (STRUCTURE_SET.has(type)) {

                                    const { structureNo } = block as StructureArrangement;
                                    let classes = "";
                                    if (paramType && type !== paramType && (structureNo !== src && structureNo !== destn)) {
                                        classes += "disabled";
                                    }

                                    return (
                                        <Structure classes={classes} key={`${type}-${structureNo}-${colInd}`} {...block as StructureArrangement} type={type as StructureTypes} structureNo={structureNo} />
                                    )
                                }

                                let activePath = '';
                                const cordHash = createCordStrHash([rowInd, cordY]);
                                if (path) {
                                    if (path.has(cordHash)) {
                                        activePath = 'road--included';
                                    } else {
                                        activePath = 'road-excluded';
                                    }
                                }

                                let isSrc = false;
                                let isDestn = false;
                                if (src) {
                                    isSrc = (block as RoadArrangement).roadHash?.has(+src) || false;
                                }
                                if (destn) {
                                    isDestn = (block as RoadArrangement).roadHash?.has(+destn) || false
                                }

                                if (ROAD_SET.has(type)) {
                                    return (
                                        <Roads getStructureRef={getRef} isSrc={isSrc} isDestn={isDestn} key={`${type}-${colInd}`} classes={activePath} {...block as RoadArrangement} type={type as RoadType} />
                                    )
                                }

                                return null;
                            })}
                        </div>
                    )
                })}
            </div>
            <Actions handleReCenter={handleRecenter} handleZoomIn={handleZoomIn} handleZoomOut={handleZoomOut} />
        </>
    )
}

export default BlockMap;
