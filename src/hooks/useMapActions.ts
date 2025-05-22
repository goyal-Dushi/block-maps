import { useState, useRef, useEffect, useCallback } from "react";

const useMapActions = () => {
  const [zoom, setZoom] = useState(1.0);
  const recenterRef = useRef<HTMLDivElement | null>(null);

  const scrollToView = useCallback((ref: React.RefObject<HTMLDivElement>) => {
    recenterRef.current = ref.current;
    ref.current?.scrollIntoView({
      block: "center",
      inline: "center",
      behavior: "smooth",
    });
  }, []);

  const handleZoomIn = () => {
    if (+zoom.toFixed(1) === 1.5) {
      return;
    }
    setZoom((prev) => {
      return prev + 0.1;
    });
  };

  const handleZoomOut = () => {
    if (zoom === 0.1) {
      return;
    }
    setZoom((prev) => {
      return prev - 0.1;
    });
  };

  const handleRecenter = () => {
    if (recenterRef) {
      scrollToView(recenterRef);
    }
  };

  useEffect(() => {
    if (zoom !== 1.0) {
      handleRecenter();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoom]);

  return { handleZoomIn, handleZoomOut, handleRecenter, scrollToView, zoom };
};

export default useMapActions;
