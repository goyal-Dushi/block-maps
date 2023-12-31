import React, { useEffect, useMemo, useState } from "react";
import { Form, useSearchParams } from "react-router-dom";
import SearchIcon from "../../../../assets/svg/Search";
import HouseIcon from "../../../../assets/svg/HouseIcon";

interface MapFormProps {
    handleFormCanvas: () => void;
}

const MapForm: React.FC<MapFormProps> = (props) => {
    const { handleFormCanvas } = props;
    const [src, setSrc] = useState('');
    const [destn, setDestn] = useState('');
    const searchParams = useSearchParams();

    const srcVal = useMemo(() => {
        return searchParams[0].get('src');
    }, [searchParams]);

    const destnVal = useMemo(() => {
        return searchParams[0].get('destn');
    }, [searchParams]);

    useEffect(() => {
        if(srcVal){
            setSrc(srcVal)
        }
        if(destnVal){
            setDestn(destnVal);
        }
    }, [srcVal, destnVal])

    const handleFormSubmit = () => {
        handleFormCanvas();
    }

    const handleSrcChange = (e: React.SyntheticEvent) => {
        const srcVal = (e.target as HTMLInputElement).value;
        setSrc(srcVal);
    }

    const handleDestnChange = (e: React.SyntheticEvent) => {
        const destnVal = (e.target as HTMLInputElement).value;
        setDestn(destnVal);
    }
 
    return (
        <div className="container-lg p-4 pt-0">
            <Form onSubmit={handleFormSubmit} method="POST">
                <div className="d-flex flex-column mb-3" style={{ marginTop: '0.8rem' }}>
                <div className="input-group flex-nowrap">
                    <span className="input-group-text" id="destn">
                        <SearchIcon />
                    </span>
                    <input autoFocus onChange={handleDestnChange} value={destn} type="number" aria-describedby="destn" id="destn" min={1} name="destn" placeholder="Find House Number" className="form-control w-100" aria-label="Destination" />
                </div>
                <div className="form-text"> {destnVal ? "The House I am trying to find!" : "Please type in the house number where you want to go!"} </div> 
                </div>
                
                <div className="d-flex flex-column mb-3">
                <div className="input-group flex-nowrap">
                <span className="input-group-text" id="destn">
                        <HouseIcon />
                    </span>
                    <input onChange={handleSrcChange} type="number" min={1} value={src} id="src" name="src" placeholder="House Number near me" className="form-control w-100" aria-label="Source" aria-describedby="src to start from" />
                </div>
                <div className="form-text"> {destnVal ? "Type in the nearest house number which you can see around you. Make sure the house number typed belongs to same block :)" : "Look around and type in nearest House number you see!"} </div>
                </div>
                
                
                
                <div className="d-flex flex-column mb-3">
                <div className="input-group">
                    <label className="form-label" htmlFor="block"> Select Block </label>
                    <select defaultValue={'D'} disabled name="block" id="block" className="form-select w-100" aria-label="select block">
                        <option value={"D"}> D-Block </option>
                    </select>
                </div>
                    <div className="form-text fst-italic"> Disabled since we only have support for D-Block! </div>
                </div>
                
                <div className="d-flex flex-column mb-3">
                <div className="input-group">
                    <label className="form-label" htmlFor="sector"> Select Sector </label>
                    <select defaultValue={'27'} disabled name="sector" id="sector" className="form-select w-100" aria-label="select sector">
                        <option value={"27"}> 27 </option>
                    </select>
                </div>
                <div className="form-text fst-italic">
                    Disabled since we only have support for sector 27
                </div>
                </div>
                
                <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary"> Submit </button>
                <button type="button" className="btn btn-outline-primary" onClick={handleFormCanvas} data-bs-dismiss="offcanvas" aria-label="Close"> Close </button>
                </div>
                
            </Form>
        </div>
    )
}

export default MapForm;