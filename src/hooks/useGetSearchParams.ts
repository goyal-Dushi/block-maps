import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const useGetSearchParams = () => {
  const searchParams = useSearchParams();

  const memoUrlSearchParams = useMemo(() => {
    return searchParams[0];
  }, [searchParams]);

  const fetchParams = useCallback(
    (params: string[]) => {
      const queryVals: string[] = [];

      params.forEach((param) => {
        queryVals.push(memoUrlSearchParams.get(param) || "");
      });

      return queryVals;
    },
    [memoUrlSearchParams]
  );

  const getAsUrlSearchParams = useCallback(() => {
    return memoUrlSearchParams;
  }, [memoUrlSearchParams]);

  const getParamsAsObject = useCallback(() => {
    const obj: Record<string, string> = {};
    for (const [key, value] of memoUrlSearchParams.entries()) {
      obj[key] = value;
    }
    return obj;
  }, [memoUrlSearchParams]);

  return { fetchParams, getAsUrlSearchParams, getParamsAsObject };
};

export default useGetSearchParams;
