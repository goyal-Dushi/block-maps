import React from 'react';
import BackIcon from '../../../../assets/svg/BackIcon';

interface StructureCanvasProps {
    handleStructureCanvas: () => void;
}

const StructureCanvas: React.FC<StructureCanvasProps> = (props) => {
    const { handleStructureCanvas } = props;

    return(
        <div id="structureCanvas" className="offcanvas show offcanvas-top h-100 overflow-y-auto position-relative">
            <button type='button' onClick={handleStructureCanvas} className="btn btn-secondary rounded-circle position-fixed back-btn">
            <BackIcon />
          </button>
            <h1> D-107, Plant seller </h1>
        </div>
    )
}

export default StructureCanvas;