import React, { useEffect, useState } from "react";
import { Arrangement, RoadArrangement } from "./pages/Map/components/blockMap/type";

interface CoordinateProps {
    mapConfig: Arrangement;
}

const Coordinate: React.FC<CoordinateProps> = (props) => {
    const { mapConfig } = props;
    const ls = window.localStorage;
    const geolocation = navigator.geolocation;
    const [blockmap, setBlockMap] = useState<any[][]>();

    if(!mapConfig){
        return null;
    }

    const getUpdateConfig = () => {
        const updateConfig = mapConfig.map((mapRow) => {
            return mapRow.map((obj) => {
                if(obj.type !== 'main' && obj.type !== 'service'){
                    return {...obj};
                }

                if(!obj.roadHash?.size){
                    return {...obj};
                }

                const hashVal = Array.from(obj.roadHash);
                delete obj.roadHash;
                (obj.roadHash as any) = hashVal;

                return obj;
            });
        });

        return updateConfig;
    }

    useEffect(() => {
        if(mapConfig){
            setBlockMap(getUpdateConfig());
        }
    }, [mapConfig]);

    useEffect(() => {
        const map = ls.getItem('map') as string;
        if(map){
            setBlockMap(JSON.parse(map) || getUpdateConfig());
        }    
    }, []);

    const handleGetCords = (row: number, col: number) => {
        const updateMap = Array.from(blockmap as Arrangement);
        
        if((updateMap[row][col] as RoadArrangement).latitude && (updateMap[row][col] as RoadArrangement).longitude){
            console.log('return handle cord');
            return;
        }

        geolocation.getCurrentPosition((pos) => {
            const {latitude , longitude} = pos.coords;
            
            (updateMap[row][col] as RoadArrangement).latitude = latitude;
            (updateMap[row][col] as RoadArrangement).longitude = longitude;

            ls.setItem('map', JSON.stringify(updateMap));
            setBlockMap(updateMap);
        }, (err) => {
            console.error(err);
        });
    }

    const handleClearCords = (row: number, col: number) => {
        // clear cords
        const map = JSON.parse(ls.getItem('map') as string);
       
        if((map[row][col] as RoadArrangement).latitude && (map[row][col] as RoadArrangement).longitude){

            (map[row][col] as RoadArrangement)['latitude'] = undefined;
            (map[row][col] as RoadArrangement)['longitude'] = undefined;    
            
            setBlockMap(map || getUpdateConfig());
            ls.setItem('map', JSON.stringify(map));
        }
    }

    if(blockmap){
        return(
            <div className="d-flex flex-column align-items-center justify-content-between gap-2">
                {(blockmap).map((mapArr, idx) => {
                    return mapArr.map((row, rowIdx) => {
                        const { type, roadHash, latitude, longitude } = row as RoadArrangement;
    
                        if(type !== 'main' && type !== 'service'){
                            return null;
                        }

                        if(!roadHash){
                            return null;
                        }
    
                        return (
                            <div key={`${idx}-${rowIdx}`}>
                            
                                <div> {(roadHash as any).map((road: number) => { return <span key={road} className="me-2">{road}</span>})} </div>
                                <div className="d-flex gap-2"> 
                                <span> Latitude: {latitude} </span>
                                <span> Longitude:  {longitude} </span> 
                            </div>
                            <div className="d-flex gap-2">
                                <button className="btn btn-primary" onClick={() => {return handleGetCords(idx, rowIdx)}}> Get Cord </button>
                                <button className="btn btn-outline-secondary" onClick={() => {return handleClearCords(idx, rowIdx)}}> Clear </button>
                            </div>
                            </div>
                        );
                    });
                })}
            </div>
        )
    }

    return null;
}

export default Coordinate;