import React, { useEffect, useRef, useState } from "react";
import { Arrangement } from "./pages/Map/components/blockMap/type";

interface CoordinateProps {
  mapConfig?: Arrangement;
}

interface BlockMapI {
  [key: string]: Array<{ lat: number; long: number }>;
}

const getUpdateConfig = () => {
  const updateState: BlockMapI = {};
  for (let i = 1; i < 200; i++) {
    updateState[i] = [];
  }

  return updateState;
};

const Coordinate: React.FC<CoordinateProps> = () => {
  const ls = window.localStorage;
  const geolocation = navigator.geolocation;
  const [blockmap, setBlockMap] = useState<BlockMapI>();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const map = ls.getItem("map") as string;
    if (map) {
      setBlockMap(JSON.parse(map));
    } else {
      setBlockMap(getUpdateConfig());
    }
  }, []);

  const handleGetCords = (house: number) => {
    const updateMap: BlockMapI = { ...blockmap };

    geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        updateMap[house].push({ lat: latitude, long: longitude });

        ls.setItem("map", JSON.stringify(updateMap));
        setBlockMap(updateMap);
      },
      (err) => {
        console.error(err);
      }
    );
  };

  const handleClearCords = (house: number) => {
    // clear cords
    const map = JSON.parse(ls.getItem("map") as string) as BlockMapI;

    if (map?.[house]) {
      map[house] = [];

      setBlockMap(map || getUpdateConfig());
      ls.setItem("map", JSON.stringify(map));
    }
  };

  const handleCopy = async () => {
    try {
      const data = ls.getItem("map") as string;

      if (data && textareaRef) {
        (textareaRef.current as HTMLTextAreaElement).value = data;
      }

      await navigator.clipboard.writeText(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTextareaClear = () => {
    if (textareaRef) {
      (textareaRef.current as HTMLTextAreaElement).value = "";
    }
    ls.removeItem("map");
    setBlockMap(getUpdateConfig());
  };

  if (blockmap) {
    return (
      <>
        <div>
          <textarea
            ref={textareaRef}
            rows={4}
            name="lsvalue"
            id="lsvalue"
            className="my-2 form-control"
          />
          <div className="d-flex gap-2">
            <button
              onClick={handleCopy}
              className="btn btn-sm btn-outline-primary"
            >
              Copy
            </button>
            <button
              onClick={handleTextareaClear}
              className="btn btn-sm btn-outline-secondary"
            >
              Clear
            </button>
          </div>
        </div>
        <div className="d-flex flex-column align-items-center justify-content-between gap-2">
          {Object.entries(blockmap).map((entry) => {
            const house = entry[0];
            const cords = entry[1];

            return (
              <div className="d-flex flex-column" key={`${house}`}>
                <div>
                  <span className="me-2">{house}</span>
                </div>
                <div className="d-flex flex-column gap-2">
                  {cords.map((cord) => {
                    const { lat: latitude, long: longitude } = cord;

                    if (!latitude || !longitude) {
                      return null;
                    }

                    return (
                      <div className="d-flex gap-2">
                        <span> Latitude: {latitude} </span>
                        <span> Longitude: {longitude} </span>
                      </div>
                    );
                  })}
                </div>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      return handleGetCords(+house);
                    }}
                  >
                    {" "}
                    Get Cord{" "}
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      return handleClearCords(+house);
                    }}
                  >
                    {" "}
                    Clear{" "}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }

  return null;
};

export default Coordinate;
