import { ZoneCode } from "@/types";

export const ZONE_CODES: ZoneCode[] = [
    "NORTH",
    "SOUTH_EAST",
    "SOUTH_WEST",
    "SOUTH_SOUTH",
];

export const ZONE_DISPLAY: Record<ZoneCode, string> = {
    NORTH: "North",
    SOUTH_EAST: "South East",
    SOUTH_WEST: "South West",
    SOUTH_SOUTH: "South South",
};
