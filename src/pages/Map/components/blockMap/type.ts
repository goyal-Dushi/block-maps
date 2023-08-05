import { RoadType } from "../roads/Roads";
import { StructureTypes } from "../structure/Structure";

export type Dimension = { cols: number, rows: number };

export type StructureArrangement = {
    type: StructureTypes;
    structureNo?: string;
    x?: number;
    y?: number;
}

export type RoadArrangement = {
    type: RoadType;
    rotn?: string;
    roadHash?: Set<number>;
    matrix_x?: number;
    matrix_y?: number;
    x?: number;
    y?: number;
}

export type Arrangement = (StructureArrangement | RoadArrangement)[][];