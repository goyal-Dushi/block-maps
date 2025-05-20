import React from "react";
import ZoomIn from "assets/svg/ZoomIn";
import ZoomOut from "assets/svg/ZoomOut";
import Recenter from "assets/svg/Recenter";

interface ActionsProps {
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  handleReCenter: () => void;
  getUserCords?: () => void;
}

const Actions: React.FC<ActionsProps> = (props) => {
  const { handleZoomIn, handleZoomOut, handleReCenter } = props;

  return (
    <div className="window-actions position-fixed">
      <button
        title="Zoom IN"
        onClick={handleZoomIn}
        data-tag-id="zoom-in-btn"
        className="btn btn-dark fw-bold me-2"
      >
        <ZoomIn />
      </button>
      <button
        title="Zoom OUT"
        data-tag-id="zoom-out-btn"
        onClick={handleZoomOut}
        className="btn btn-dark fw-bold me-2"
      >
        <ZoomOut />
      </button>
      <button
        title="Re-center"
        data-tag-id="recenter-btn"
        onClick={handleReCenter}
        className="btn btn-primary fw-bold"
      >
        <Recenter />
      </button>
    </div>
  );
};

export default Actions;
