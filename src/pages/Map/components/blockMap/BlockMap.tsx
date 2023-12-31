import React, { useState, useEffect } from "react";
import Structure, { STRUCTURE_SET, StructureTypes } from "../structure/Structure";
import Roads, { ROAD_SET, RoadType } from "../roads/Roads";
import { createCordStrHash } from "../../../../utils/createBlockMatrix";
import { Arrangement, Dimension, RoadArrangement, StructureArrangement } from "./type";
import Actions from "../actions/Actions";
import './BlockMap.scss';

export interface BlockMapProps {
    arrangement: Arrangement;
    dimension: Dimension;
    path?: Set<string>;
    type?: StructureTypes | undefined;
    src?: string;
    destn?: string;
    // handleBusiness
}

const BlockMap: React.FC<BlockMapProps> = (props) => {
    const { arrangement, dimension, path, src, destn } = props;
    const [srcRef, setSrcRef] = useState<React.RefObject<HTMLDivElement>
    >();
    const [destnRef, setDestnRef] = useState<React.RefObject<HTMLDivElement>
    >();
    const [zoom, setZoom] = useState(1.0);

    const scrollToView = (ref: React.RefObject<HTMLDivElement>) => {
        ref.current?.scrollIntoView({
            block: "center",
            inline: "center",
            behavior: 'smooth',
        });
    }

    const getRef = (ref: React.RefObject<HTMLDivElement>, type: "src" | "destn") => {
        scrollToView(ref);
        if(type === "src"){
            setSrcRef(ref);
        } else {
            setDestnRef(ref);
        }
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
        if(srcRef){
            scrollToView(srcRef);
        } else if(destnRef){
            scrollToView(destnRef);
        }
    }

    useEffect(() => {
        if(zoom !== 1.0){
            handleRecenter();
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
                                    // if (paramType && type !== paramType && (structureNo !== src && structureNo !== destn)) {
                                    //     classes += "disabled";
                                    // }

                                    if(structureNo === src || structureNo === destn){
                                        classes += ' active';
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
