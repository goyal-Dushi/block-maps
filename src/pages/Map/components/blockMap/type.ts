import { RoadType } from "../roads/Roads";
import { StructureTypes } from "../structure/Structure";

export type Dimension = { cols: number; rows: number };

export interface StructureArrangement {
  type: StructureTypes;
  text?: string;
  entryPnt?: "left" | "right" | "mid";
  business?: string;
  classes?: string;
}

export interface RoadArrangement {
  type: RoadType; // main or service
  rotn?: boolean; // stripe rotn
  roadHash?: Set<number>; // houses connected to road
  cords?: Record<string, string>; // road coordinates
  classes?: string; // additional classes for styling,
  text?: string; // text to be displayed on road
  isGate?: boolean; // is road a gate\
  gateProps?: BlockGate; // gate object
  triJunction?: Intersection; // intersection object
}

export interface BlockGate {
  open?: boolean; // gate open or closed
  text?: string; // text to be displayed on gate
  classes?: string; // additional classes for styling
  timings?: {
    start: number;
    end: number;
  };
}

interface Intersection {
  dir: "left" | "right" | "up" | "down"; // direction of intersection
}

export type Arrangement = (StructureArrangement | RoadArrangement)[][];
