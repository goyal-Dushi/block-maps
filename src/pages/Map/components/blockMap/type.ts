import { RoadType } from "../roads/Roads";
import { StructureTypes } from "../structure/Structure";

export type Dimension = { cols: number, rows: number };

export type StructureArrangement = {
    type: StructureTypes;
    structureNo?: string;
    entryPnt?: "left" | "right" | "mid";
}

export type RoadArrangement = {
    type: RoadType; // main or service 
    rotn?: boolean; // stripe rotn 
    roadHash?: Set<number>; // houses connected to road
    matrix_x?: number;
    matrix_y?: number;
    x?: number;
    y?: number;
}

export type Arrangement = (StructureArrangement | RoadArrangement)[][];