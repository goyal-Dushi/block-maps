import React from "react";
import ZoomIn from "assets/svg/ZoomIn";
import ZoomOut from "assets/svg/ZoomOut";
import Recenter from "assets/svg/Recenter";
import "./actions.scss";

interface ActionsProps {
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  handleReCenter: () => void;
  getUserCords: () => void;
}

const Actions: React.FC<ActionsProps> = (props) => {
  const { handleZoomIn, handleZoomOut, handleReCenter, getUserCords } = props;

  return (
    <div className="window-actions position-fixed">
      <button
        title="Zoom IN"
        onClick={handleZoomIn}
        className="btn btn-primary fw-bold me-2"
      >
        <ZoomIn />
      </button>
      <button
        title="Zoom OUT"
        onClick={handleZoomOut}
        className="btn btn-primary fw-bold me-2"
      >
        <ZoomOut />
      </button>
      <button
        title="Re-center"
        onClick={handleReCenter}
        className="btn btn-primary fw-bold"
      >
        <Recenter />
      </button>
      <button className="btn btn-primary" type="button" onClick={getUserCords}>
        Get Cord
      </button>
    </div>
  );
};

export default Actions;
