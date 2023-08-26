import React from "react";
import ZoomIn from "../../../../assets/svg/ZoomIn";
import ZoomOut from "../../../../assets/svg/ZoomOut";

interface ActionsProps {
    handleZoomIn: () => void;
    handleZoomOut: () => void;
}

const Actions: React.FC<ActionsProps> = (props) => {

    const { handleZoomIn, handleZoomOut } = props;

    return (
        <div className="window-actions position-sticky">
            <button onClick={handleZoomIn} className="btn btn-secondary me-2">
                <ZoomIn />
            </button>
            <button onClick={handleZoomOut} className="btn btn-secondary">
                <ZoomOut />
            </button>
        </div>
    )
}

export default Actions;