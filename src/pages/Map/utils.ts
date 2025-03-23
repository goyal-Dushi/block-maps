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
  latThreshold = 0.0001,
  lonThreshold = 0.0001
): RoadArrangement & { match: boolean } => {
  if (data.cords && typeof data.cords === "object" && userCords) {
    const { lat: userLat, long: userLon } = userCords;

    for (let lat in data.cords) {
      const lon = data.cords[lat];
      const storedLat = parseFloat(lat);
      const storedLon = parseFloat(lon);

      // Check if the difference is within the threshold
      if (
        Math.abs(userLat - storedLat) <= latThreshold &&
        Math.abs(userLon - storedLon) <= lonThreshold
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
