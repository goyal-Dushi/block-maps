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
  houseCords?: Record<string, BoxCordI>;
};

export interface CordI {
  lat: number;
  long: number;
}

export interface BoxCordI {
  set1?: CordI;
  set2?: CordI;
}

/*
  houseCOrd = { 107: [{ lat: 38.32932, long: 30.90239 }] }
*/

export type Arrangement = (StructureArrangement | RoadArrangement)[][];
