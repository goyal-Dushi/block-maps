import React from "react";
import MapForm from "./MapForm";
import { Language } from "translations";

interface FormCanvasProps {
  lang: Language;
  onLangChange: (lang: Language) => void;
  handleCanvas: () => void;
}

const FormCanvas: React.FC<FormCanvasProps> = (props) => {
  const { handleCanvas, onLangChange, lang } = props;

  return (
    <div
      className={`offcanvas offcanvas-top show h-100`}
      tabIndex={-1}
      id="offcanvas"
      aria-labelledby="offcanvasLabel"
    >
      <div className="offcanvas-body">
        <MapForm
          lang={lang}
          onLangChange={onLangChange}
          handleFormCanvas={handleCanvas}
        />
      </div>
    </div>
  );
};

export default FormCanvas;
