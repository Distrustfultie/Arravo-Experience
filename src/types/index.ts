export type ZoneCode =
    | "NORTH"
    | "SOUTH_EAST"
    | "SOUTH_WEST"
    | "SOUTH_SOUTH";

export type Role = "admin" | "hr" | "staff";

export type StaffMember = {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string | null;
    role: Role;
    zone: ZoneCode;
    zoneDisplay: string;
};

export type AuthUser = {
    id: string;
    email: string | null;
    role: Role;
    firstName: string | null;
    lastName: string | null;
};
