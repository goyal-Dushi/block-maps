import useGetSearchParams from "hooks/useGetSearchParams";
import { useEffect, useRef, useState } from "react";

export interface UserCordsI {
  lat: number;
  long: number;
}

const useGetUserCords = () => {
  const [userCords, setUserCords] = useState<UserCordsI | undefined>();
  const { fetchParams } = useGetSearchParams();
  const intervalRef = useRef<number | null>(null);
  const [nav] = fetchParams(["nav", "destn"]);

  const getUserCords = () => {
    if (nav === "start" && navigator.geolocation) {
      const cords = { lat: 0, long: 0 };

      navigator.geolocation.getCurrentPosition((position) => {
        cords.lat = position.coords.latitude;
        cords.long = position.coords.longitude;
      }, null);

      return cords;
    }

    return undefined;
  };

  const stopPolling = () => {
    intervalRef.current && clearInterval(intervalRef.current);
  };

  const pollUserCords = () => {
    intervalRef.current = setInterval(() => {
      setUserCords(getUserCords());
    }, 1000);
  };

  useEffect(() => {
    if (nav === "start") {
      pollUserCords();
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
