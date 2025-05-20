import React from "react";
import SearchIcon from "assets/svg/SearchIcon";
import HouseIcon from "assets/svg/HouseIcon";
import useGetSearchParams from "hooks/useGetSearchParams";
import { Language, translations } from "translations";
import { useNavigate } from "react-router-dom";

interface MapFormProps {
  lang: Language;
  handleFormCanvas: () => void;
}

const TEXT = translations;

const MapForm: React.FC<MapFormProps> = (props) => {
  const { handleFormCanvas } = props;
  const { getAsUrlSearchParams } = useGetSearchParams();
  const searchParams = getAsUrlSearchParams();
  const navigate = useNavigate();
  const lang = (searchParams.get("lang") as Language) || "eng";
  const text = TEXT?.[lang];

  const handleCloseCanvas = () => {
    if (searchParams.has("canvas")) {
      searchParams.delete("canvas");
      window.location.search = searchParams.toString();
    }

    handleFormCanvas();
  };

  const handleFormSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const searchParams = getAsUrlSearchParams();

    // Access input values using form.elements
    for (const input of form.elements) {
      const fieldName = (input as HTMLInputElement).name;
      const fieldValue = (input as HTMLInputElement).value;

      if (!fieldValue) {
        searchParams.delete(fieldName);
      } else {
        searchParams.set(fieldName, fieldValue);
      }
    }

    searchParams.delete("canvas");
    window.location.search = searchParams.toString();
    handleFormCanvas();
  };

  const handleLangChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newLang = event.currentTarget.id as Language;
    const searchParams = getAsUrlSearchParams();
    searchParams.set("lang", newLang);

    navigate(
      {
        pathname: window.location.pathname,
        search: searchParams.toString(),
      },
      {
        replace: true,
      }
    );
  };

  return (
    <div className="container-lg p-4 pt-0">
      <form onSubmit={handleFormSubmit} method="POST">
        <div className="d-flex gap-2">
          <button
            data-tag-id="submit-btn"
            type="submit"
            className="btn btn-primary"
          >
            {" "}
            {text.form.submit.label}{" "}
          </button>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleCloseCanvas}
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            data-tag-id="close-btn"
          >
            {" "}
            {text.form.close.label}{" "}
          </button>
          <button
            type="button"
            className="ms-auto btn btn-outline-primary"
            data-tag-id={lang === "eng" ? "hindi" : "english"}
            id={lang === "eng" ? "hin" : "eng"}
            onClick={handleLangChange}
          >
            {lang === "eng" ? TEXT.lang.hin : TEXT.lang.eng}
          </button>
        </div>
        <div
          className="d-flex flex-column mb-3"
          style={{ marginTop: "0.8rem" }}
        >
          <div
            data-tag-id="destn-input-field"
            className="input-group flex-nowrap"
          >
            <span className="input-group-text" id="destn">
              <SearchIcon />
            </span>
            <input
              autoFocus
              defaultValue={searchParams.get("destn") || ""}
              type="number"
              id="destn"
              inputMode="numeric"
              pattern="\d*"
              min={1}
              name="destn"
              placeholder={text.form.destn.placeholder}
              className="form-control w-100"
              aria-label="Destination"
            />
          </div>
          <div className="form-text">
            {" "}
            {searchParams.has("destn")
              ? text.form.destn.helpertext.hasDestn
              : text.form.destn.helpertext.default}{" "}
          </div>
        </div>

        <div className="d-flex flex-column mb-3">
          <div
            data-tag-id="src-input-field"
            className="input-group flex-nowrap"
          >
            <span className="input-group-text" id="destn">
              <HouseIcon />
            </span>
            <input
              type="number"
              min={1}
              inputMode="numeric"
              pattern="\d*"
              defaultValue={searchParams.get("src") || ""}
              id="src"
              name="src"
              placeholder={text.form.src.placeholder}
              className="form-control w-100"
              aria-label="Source"
              aria-describedby="src to start from"
            />
          </div>
          <div className="form-text">
            {" "}
            {searchParams.has("destn")
              ? text.form.src.helpertext.hasDestn
              : text.form.src.helpertext.default}{" "}
          </div>
        </div>

        <div className="d-flex flex-column mb-3">
          <div className="input-group">
            <label className="form-label" htmlFor="block">
              {" "}
              Select Block{" "}
            </label>
            <select
              defaultValue={"D"}
              disabled
              name="block"
              id="block"
              className="form-select w-100"
              aria-label="select block"
            >
              <option value={"D"}> D-Block </option>
            </select>
          </div>
          {/* <div className="form-text fst-italic">
            {" "}
            Disabled since we only have support for D-Block!{" "}
          </div> */}
        </div>

        <div className="d-flex flex-column mb-3">
          <div className="input-group">
            <label className="form-label" htmlFor="sector">
              {" "}
              Select Sector{" "}
            </label>
            <select
              defaultValue={"27"}
              disabled
              name="sector"
              id="sector"
              className="form-select w-100"
              aria-label="select sector"
            >
              <option value={"27"}> 27 </option>
            </select>
          </div>
          {/* <div className="form-text fst-italic">
            Disabled since we only have support for sector 27
          </div> */}
        </div>
      </form>
    </div>
  );
};

export default MapForm;
