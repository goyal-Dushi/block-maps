import React from "react";
import Roads from "../roads/Roads";
import { RoadArrangement } from "./type";
import {
  getIsActivePath,
  getIfSrcOrDestn,
  checkIfGateOpen,
} from "pages/Map/utils";
import { UserCordsI } from "hooks/useGetUserCords";

export interface RoadViewProps {
  rowIdx: number;
  cordY: number;
  path?: Set<string>;
  src?: string;
  colIdx: number;
  destn?: string;
  userCords?: UserCordsI;
  scrollToView?: (ref: React.RefObject<HTMLDivElement>) => void;
  data: RoadArrangement;
}

const RoadView: React.FC<RoadViewProps> = (props) => {
  const { data, src, destn, cordY, rowIdx, path, colIdx, scrollToView } = props;

  const isActivePath = getIsActivePath(rowIdx, cordY, path);
  const { isDestn, isSrc } = getIfSrcOrDestn(data, src, destn);
  const isGateOpen = checkIfGateOpen(data);

  return (
    <Roads
      {...data}
      scrollToView={scrollToView}
      isSrc={isSrc}
      isPath={isActivePath}
      isDestn={isDestn}
      isGateOpen={isGateOpen}
      key={`${data.type}-${colIdx}`}
      classes={`${isActivePath ? "road--included" : ""} ${data.classes || ""}`}
    />
  );
};

export default RoadView;
