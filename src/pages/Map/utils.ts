import { UserCordsI } from "hooks/useGetUserCords";
import { ActionFunction, redirect } from "react-router-dom";
import { RoadArrangement } from "./components/blockMap/type";

export const mapFormAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const url = new URL(request.url);

  let redirectURL: string = url.origin + url.pathname;
  const searchParams = new URLSearchParams(url.search);

  for (const [key, value] of formData.entries()) {
    if (value) {
      searchParams.set(key, value as string);
    } else if (searchParams.has(key)) {
      searchParams.delete(key);
    }
  }

  redirectURL = redirectURL + "?" + searchParams.toString();
  return redirect(redirectURL);
};

export const createCordStrHash = (cord: [number, number]) => {
  const cordStr = `${cord[0]}-${cord[1]}`;
  return cordStr;
};

export const getIsActivePath = (
  row: number,
  cordY: number,
  path?: Set<string>
) => {
  const cordHash = createCordStrHash([row, cordY]);

  if (path && path.has(cordHash)) {
    return true;
  }

  return false;
};

export const findIfCoordinatesMatching = (
  data: RoadArrangement,
  userCords?: UserCordsI,
  latThreshold = 0.0002,
  lonThreshold = 0.0002
): RoadArrangement & { match: boolean } => {
  const seachParams = new URLSearchParams(window.location.search);
  const p = seachParams.get("p");
  const newLatThreshold = p ? parseFloat(p) : latThreshold;
  const newLonThreshold = p ? parseFloat(p) : lonThreshold;

  if (data.cords && typeof data.cords === "object" && userCords) {
    const { lat: userLat, long: userLon } = userCords;

    for (let lat in data.cords) {
      const lon = data.cords[lat];
      const storedLat = parseFloat(lat);
      const storedLon = parseFloat(lon);

      console.log("storedLat", storedLat);
      console.log("storedLon", storedLon);

      // Check if the difference is within the threshold
      if (
        Math.abs(userLat - storedLat) <= newLatThreshold &&
        Math.abs(userLon - storedLon) <= newLonThreshold
      ) {
        return {
          match: true,
          ...data,
        };
      }
    }
  }

  return { match: false, ...data };
};

export const getIfSrcOrDestn = (
  data: RoadArrangement,
  src?: string,
  destn?: string
) => {
  const returnObj = { isSrc: false, isDestn: false };

  if (src) {
    returnObj.isSrc = data.roadHash?.has(+src) || false;
  }
  if (destn) {
    returnObj.isDestn = data.roadHash?.has(+destn) || false;
  }

  return returnObj;
};
