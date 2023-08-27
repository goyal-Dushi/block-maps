import React from "react";
import { Form } from "react-router-dom";
import { STRUCTURE_SET } from "../Map/components/structure/Structure";
import { capitalize } from "../../utils/common";

interface GetMapInfoProps { }

const GetMapInfo: React.FC<GetMapInfoProps> = () => {

    const structureOptions = Array.from(STRUCTURE_SET);

    return (
        <div className="container">

            <div className="my-4">
                <Form method="POST">
                    <div className="input-group mb-3">
                        <select name="type" className="form-select" aria-label="select sector">
                            <option value="">What are you looking for?</option>
                            {structureOptions.map((option) => {
                                return (
                                    <option key={option} value={option} > {capitalize(option)} </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <select required name="sector" className="form-select" aria-label="select sector">
                            <option value="">Select the sector</option>
                            <option value="27">27</option>
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <select required name="block" className="form-select" aria-label="select block">
                            <option value="">Select the block</option>
                            <option value="D">D</option>
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <input type="number" min={1} name="src" placeholder="Type Source" className="form-control" aria-label="Source" aria-describedby="src to start from"/>
                    </div>
                    <div className="input-group mb-3">
                        <input type="number" min={1} name="destn" placeholder="Type Destination" className="form-control" aria-label="Destination" aria-describedby="destination to visit"/>
                    </div>

                    <button type="submit" className="btn btn-primary" > Submit </button>
                </Form>
            </div>
        </div>
    )
}

export default GetMapInfo;