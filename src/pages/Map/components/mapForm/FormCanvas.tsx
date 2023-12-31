import React from "react";
import MapForm from "./MapForm";

interface FormCanvasProps {
    handleCanvas: () => void;
}

const FormCanvas: React.FC<FormCanvasProps> = (props) => {
    const { handleCanvas } = props;

    return(
        <div className={`offcanvas offcanvas-top show h-100`} tabIndex={-1} id="offcanvas" aria-labelledby="offcanvasLabel">
  <div className="offcanvas-body">
    <MapForm handleFormCanvas={handleCanvas} />
  </div>
  
</div>
    );
}

export default FormCanvas;
