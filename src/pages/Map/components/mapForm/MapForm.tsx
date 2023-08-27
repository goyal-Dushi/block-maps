import React, { useMemo } from "react";
import { Form, useSearchParams } from "react-router-dom";
import { STRUCTURE_SET } from "../structure/Structure";
import { capitalize } from "../../../../utils/common";

interface MapFormProps { }

const MapForm: React.FC<MapFormProps> = () => {

    const searchParams = useSearchParams();

    const isSrcPresent = useMemo(() => {
        return searchParams[0].has('src');
    }, [searchParams]);

    const isDestPresent = useMemo(() => {
        return searchParams[0].has('destn');
    }, [searchParams]);

    const structureOptions = Array.from(STRUCTURE_SET);

    return (
        <div className="container-lg p-4">
            <Form method="POST">
                <div className="input-group mb-3 d-flex flex-column">
                    <label className="form-label" htmlFor="src"> {isDestPresent ? "Lost?" : "Source"} </label>
                    <input type="number" min={1} id="src" name="src" placeholder="Type Source" className="form-control w-100" aria-label="Source" aria-describedby="src to start from" />
                    <div className="form-text"> {isDestPresent ? "Type in the nearest house number which you can see around you. Make sure the house number typed belongs to same block :)" : "Provide your starting point. Type in nearest House number!"} </div>
                </div>
                <div className="input-group mb-3 d-flex flex-column">
                    <label className="form-label" htmlFor="destn"> {isDestPresent ? "Change Destination" : "Destination"} </label>
                    <input type="number" id="destn" min={1} name="destn" placeholder="Type Destination" className="form-control w-100" aria-label="Destination" aria-describedby="destination to visit" />
                    <div className="form-text"> {isDestPresent ? "" : "Please type in the house number where you want to go!"} </div> 
                </div>
                <div className="input-group mb-3 d-flex flex-column">
                    <label className="form-label" htmlFor="type"> Looking for something else? </label>
                    <select name="type" id="type" className="form-select w-100" aria-label="select sector">
                        <option value="">Select option</option>
                        {structureOptions.map((option) => {
                            return (
                                <option key={option} value={option} > {capitalize(option)} </option>
                            )
                        })}
                    </select>
                </div>
                {isSrcPresent && isDestPresent && (
                    <div className="input-group mb-3 d-flex flex-column">
                        <label className="form-label" htmlFor="type"> Want to take a different route? </label>
                        <select name="path" id="path" className="form-select w-100" aria-label="select sector">
                            <option value="">Select option</option>
                            {Array(4).fill('path').map((_, i) => {
                                const path = i.toString();
                                return(
                                    <option key={path} value={path}> {i+1} </option>
                                )
                            })}
                        </select>
                        <div className="form-text"> Please note that these path are ordered on basis of their distance. The smaller the number you select, the shorter the path is! </div>
                    </div>
                )}
                <button type="submit" className="btn btn-primary"> Submit </button>
            </Form>
        </div>
    )
}

export default MapForm;