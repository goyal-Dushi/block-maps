import React, { useRef, useEffect } from "react";
import LocatorSrc from "assets/locator_red.png";
import LocatorDestn from "assets/locator_red.png";
import { RoadArrangement } from "../blockMap/type";
import useGetSearchParams from "hooks/useGetSearchParams";
import IntersectinIcon from "assets/svg/IntersectionIcon";

interface RoadsProps extends RoadArrangement {
  classes?: string;
  isSrc: boolean;
  isDestn: boolean;
  isPath: boolean;
  isGateOpen?: boolean;
  scrollToView?: (ref: React.RefObject<HTMLDivElement>) => void;
}

export const ROAD_SET = new Set<string>(["service", "main"]);
export type RoadType = "service" | "main";

const Roads: React.FC<RoadsProps> = (props) => {
  const roadRef = useRef<HTMLDivElement>(null);
  const {
    type,
    classes,
    isSrc,
    isDestn,
    scrollToView,
    isGateOpen = true,
    triJunction,
    gateProps,
  } = props;
  const { fetchParams } = useGetSearchParams();
  const [srcVal] = fetchParams(["src"]);

  useEffect(() => {
    if (srcVal && isSrc) {
      scrollToView?.(roadRef);
    }
    if (isDestn && !srcVal) {
      scrollToView?.(roadRef);
    }
  }, [isDestn, srcVal, isSrc, scrollToView]);

  const triJunctionDir = triJunction?.dir || "";
  const { text } = gateProps || {};

  return (
    <div
      ref={roadRef}
      className={`road road__${type} ${classes} ${!isGateOpen ? "road--closed" : ""} ${triJunctionDir ? `road__tri-intersection` : ""}`}
    >
      {(isSrc || isDestn) && (
        <div>
          <div className="locator">
            <img
              src={isSrc ? LocatorSrc : LocatorDestn}
              className="mb-4"
              alt="locator"
              height={60}
            />
          </div>
        </div>
      )}
      {triJunctionDir ? (
        <IntersectinIcon className={`junction junction--${triJunctionDir}`} />
      ) : null}
      {text && (
        <div className="gate__text">
          <span>{text}</span>
        </div>
      )}
    </div>
  );
};

export default Roads;
