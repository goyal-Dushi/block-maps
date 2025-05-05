import useGetSearchParams from "hooks/useGetSearchParams";
import { useEffect, useRef, useState } from "react";

export interface UserCordsI {
  lat: number;
  long: number;
}

const useGetUserCords = () => {
  const [userCords, setUserCords] = useState<UserCordsI | undefined>();
  const { fetchParams } = useGetSearchParams();
  const watchPositionRef = useRef<number>();
  const [nav] = fetchParams(["nav", "destn"]);

  const getUserCords = () => {
    let cords: UserCordsI | undefined;
    if (nav === "start" && navigator.geolocation) {
      cords = { lat: 0, long: 0 };

      watchPositionRef.current = navigator.geolocation.watchPosition((position) => {
        (cords as UserCordsI).lat = position.coords.latitude;
        (cords as UserCordsI).long = position.coords.longitude;
      }, null, {
        enableHighAccuracy: false,
        maximumAge: 2000,
      })
    }

    setUserCords(cords);
  };

  const stopPolling = () => {
    if (watchPositionRef.current) {
      navigator.geolocation.clearWatch(watchPositionRef.current);
      watchPositionRef.current = undefined;
    }
  };

  useEffect(() => {
    if (nav === "start") {
      getUserCords();
    }

    if (nav === "stop") {
      stopPolling();
    }

    return () => {
      stopPolling();
    };
  }, [nav]);

  return { userCords };
};

export default useGetUserCords;
