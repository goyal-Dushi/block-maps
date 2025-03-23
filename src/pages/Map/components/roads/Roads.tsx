import React, { useRef, useEffect, useMemo } from "react";
import "./Roads.scss";
import LocatorSrc from "assets/locator_red.png";
import LocatorDestn from "assets/locator_red.png";
import { RoadArrangement } from "../blockMap/type";
import useGetSearchParams from "hooks/useGetSearchParams";
import NavButton from "./NavButton";
import PersonWalk from "assets/svg/Person";

interface RoadsProps extends RoadArrangement {
  classes?: string;
  isSrc: boolean;
  isDestn: boolean;
  match: boolean;
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
    match: userLocMatch,
    scrollToView,
  } = props;
  const { fetchParams } = useGetSearchParams();
  const [srcVal, destnVal, navParam] = fetchParams(["src", "destn", "nav"]);

  const showStartNavBtn = useMemo(() => {
    if (isSrc && srcVal && destnVal && (!navParam || navParam === "stop")) {
      return true;
    }

    return false;
  }, [srcVal, destnVal, isSrc, navParam]);

  const showStopNavBtn = useMemo(() => {
    return isSrc && navParam === "start";
  }, [showStartNavBtn, isSrc]);

  useEffect(() => {
    if (srcVal && isSrc) {
      scrollToView?.(roadRef);
    }
    if (isDestn && !srcVal) {
      scrollToView?.(roadRef);
    }
  }, [isDestn, srcVal, isSrc, scrollToView]);

  return (
    <div ref={roadRef} className={`road road__${type} ${classes}`}>
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
          {showStartNavBtn ? <NavButton /> : null}
        </div>
      )}
      {userLocMatch ? (
        <>
          <PersonWalk />
        </>
      ) : null}
      {showStopNavBtn ? <NavButton stopNav /> : null}
      {/* <span className={`stripe ${rotn ? "stripe--vertical" : ""}`}></span> */}
    </div>
  );
};

export default Roads;
