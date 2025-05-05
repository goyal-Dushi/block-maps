import { UserCordsI } from "hooks/useGetUserCords";
import { ActionFunction, redirect } from "react-router-dom";
import { CordI, RoadArrangement } from "./components/blockMap/type";
import { DblockConfig } from "maps/sector27/Dblock";
import boxCords from "maps/boxCords.json";
import { ROAD_SET } from "./components/roads/Roads";

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
): RoadArrangement & { match: boolean } => {
  if (userCords && data.houseCords && Object.keys(data.houseCords).length) {
    const { lat: uLat, long: uLong } = userCords;

    data.roadHash?.forEach((houseNo) => {
      const houesCord = data.houseCords?.[houseNo];
      if (houesCord) {
        let Gx = 0, Gy = 0, Sx = 0, Sy = 0;
        const { set1, set2 } = houesCord;

        if (set1 && set2) {
          if (set1.lat < set2.lat) {
            Gx = set2.lat;
            Sx = set1.lat;
          } else {
            Gx = set1.lat;
            Sx = set2.lat;
          }

          if (set1.long < set2.long) {
            Gy = set2.lat;
            Sy = set1.lat;
          } else {
            Gy = set1.lat;
            Sy = set2.lat;
          }

          // check if user cords lies within cord
          if ((uLat <= Gx && uLat >= Sx) && (uLong <= Gy && uLong >= Sy)) {
            return { match: true, ...data };
          }

          return { match: false, ...data };
        }
      }
    })
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

export const toRemove = () => {
  const blockConfig = DblockConfig;
  const newCords: Record<string, CordI[]> = boxCords;

  const updatedConfig = blockConfig.map((rowData) => {

    return rowData.map((data) => {

      if (ROAD_SET.has(data.type)) {

        if ((data as RoadArrangement).roadHash?.size) {
          let houseCords: Record<string, any> = {};

          (data as RoadArrangement).roadHash?.forEach((houseNo) => {
            houseCords = { ...houseCords, [houseNo]: {} };

            newCords[houseNo]?.forEach((set, idx) => {
              houseCords[houseNo][`set${idx + 1}`] = { lat: set.lat, long: set.long };
            });
          });

          return {
            ...data,
            houseCords,
          }
        }
      }

      return data;
    })
  });

  return updatedConfig;
}
