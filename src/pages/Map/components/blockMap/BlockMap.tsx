import React from "react";
import { STRUCTURE_SET, StructureTypes } from "../structure/Structure";
import { ROAD_SET } from "../roads/Roads";
import {
  Arrangement,
  Dimension,
  RoadArrangement,
  StructureArrangement,
} from "./type";
import Actions from "../actions/Actions";
import useMapActions from "hooks/useMapActions";
import StructureView from "./StructureView";
import RoadView from "./RoadView";
import { UserCordsI } from "hooks/useGetUserCords";

export interface BlockMapProps {
  arrangement: Arrangement;
  dimension: Dimension;
  path?: Set<string>;
  type?: StructureTypes | undefined;
  src?: string;
  destn?: string;
}

const BlockMap: React.FC<BlockMapProps> = (props) => {
  const { arrangement, dimension, path, src, destn } = props;
  const { handleRecenter, handleZoomIn, handleZoomOut, scrollToView, zoom } =
    useMapActions();
  const [userCords, _] = React.useState<UserCordsI>({
    lat: 0,
    long: 0,
  });

  return (
    <>
      <div
        className="container-xl map"
        style={{
          width: `${dimension.cols * 50}px`,
          height: `${dimension.rows * 50}px`,
          transformOrigin: "top left",
          transform: `scale(${zoom})`,
        }}
      >
        {arrangement.map((arrRow, rowInd) => {
          let cordY = -1;
          return (
            <div className="row" key={rowInd}>
              {arrRow.map((block, colInd) => {
                cordY += 1;
                const { type } = block;

                if (STRUCTURE_SET.has(type)) {
                  return (
                    <StructureView
                      data={block as StructureArrangement}
                      idx={colInd}
                      destn={destn}
                      src={src}
                    />
                  );
                }

                if (ROAD_SET.has(type)) {
                  return (
                    <RoadView
                      colIdx={colInd}
                      cordY={cordY}
                      userCords={userCords}
                      data={block as RoadArrangement}
                      rowIdx={rowInd}
                      destn={destn}
                      path={path}
                      src={src}
                      scrollToView={scrollToView}
                    />
                  );
                }

                return null;
              })}
            </div>
          );
        })}
      </div>
      <Actions
        handleReCenter={handleRecenter}
        handleZoomIn={handleZoomIn}
        handleZoomOut={handleZoomOut}
      />
    </>
  );
};

export default BlockMap;
