import { RoadType } from "../roads/Roads";
import { StructureTypes } from "../structure/Structure";

export type Dimension = { cols: number; rows: number };

export type StructureArrangement = {
  type: StructureTypes;
  structureNo?: string;
  entryPnt?: "left" | "right" | "mid";
  business?: string;
};

export type RoadArrangement = {
  type: RoadType; // main or service
  rotn?: boolean; // stripe rotn
  roadHash?: Set<number>; // houses connected to road
  cords?: Record<string, string>; // road coordinates
};

export type Arrangement = (StructureArrangement | RoadArrangement)[][];
