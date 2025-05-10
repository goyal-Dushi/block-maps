import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import BlockMap from "./components/blockMap/BlockMap";
import { DblockConfig } from "../../maps/sector27/Dblock";
import { solve } from "../../utils";
import { StructureTypes } from "./components/structure/Structure";
import FormCanvas from "./components/mapForm/FormCanvas";
import StructureCanvas from "./components/structureCanvas/StructureCanvas";
import BackSvg from "assets/svg/BackIcon";
import SearchSvg from "assets/svg/SearchIcon";
import useGetSearchParams from "hooks/useGetSearchParams";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const { getParamsAsObject } = useGetSearchParams();
  const paramsObj = getParamsAsObject();
  const navigate = useNavigate();
  const [pathSet, setPathHash] = useState<Set<string>>();
  const [strctType, _] = useState<StructureTypes | undefined>();
  const [showCanvas, setShowCanvas] = useState(false);
  const [showStructureCanvas, setShowStructureCanvas] = useState(false);

  const destnVal = useMemo(() => {
    return paramsObj.destn;
  }, [paramsObj]);

  const dBLockConfig = {
    rows: DblockConfig.length,
    cols: DblockConfig[0].length,
  };

  useEffect(() => {
    if (!paramsObj.block || !paramsObj.sector) {
      navigate("/");
      return;
    }

    if (paramsObj.src && paramsObj.destn) {
      const set = solve(paramsObj.src, paramsObj.destn);
      setPathHash(set);
    } else {
      setPathHash(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsObj.src, paramsObj.destn]);

  const handleCanvas = useCallback(() => {
    setShowCanvas((prev) => {
      return !prev;
    });
  }, []);

  useEffect(() => {
    if (paramsObj.canvas && !showCanvas) {
      handleCanvas();
    }
  }, [paramsObj, paramsObj.canvas, handleCanvas, showCanvas]);

  const handleStructureCanvas = useCallback(() => {
    setShowStructureCanvas((prev) => {
      return !prev;
    });
  }, []);

  return (
    <div className="page-wrapper">
      <div className="map-window">
        {destnVal ? (
          <>
            <button
              type="button"
              data-tag-id="back-btn"
              onClick={handleCanvas}
              className="btn btn-secondary rounded-circle position-fixed back-btn"
            >
              <BackSvg />
            </button>
          </>
        ) : (
          <>
            <div
              className="input-group mb-3 position-fixed"
              style={{
                top: "1.8rem",
                left: "10%",
                width: "80%",
                zIndex: "150",
              }}
            >
              <label htmlFor="destn" className="input-group-text">
                <SearchSvg />
              </label>
              <input
                value={destnVal || ""}
                readOnly
                data-tag-id="search-bar"
                onClick={handleCanvas}
                id="destn"
                type="number"
                className="form-control"
                placeholder="Find House Number"
                aria-label="find"
              />
            </div>
          </>
        )}
        <BlockMap
          arrangement={DblockConfig}
          type={strctType}
          src={paramsObj.src}
          destn={paramsObj.destn}
          path={pathSet}
          dimension={{ ...dBLockConfig }}
        />
      </div>
      {showCanvas && <FormCanvas handleCanvas={handleCanvas} />}
      {showStructureCanvas && (
        <StructureCanvas handleStructureCanvas={handleStructureCanvas} />
      )}
    </div>
  );
};

export default App;
