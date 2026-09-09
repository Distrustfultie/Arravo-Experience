import { apiFetch } from "@/lib/api";
import { Role, StaffMember, ZoneCode } from "@/types";

type BackendStaffItem = {
    id: string;
    first_name: string;
    last_name: string;
    full_name: string;
    email: string;
    role: string;
    geopolitical_zone: string;
    zone_display: string;
};

type StaffListResponseBody = {
    staff: BackendStaffItem[];
    total: number;
    page: number;
    limit: number;
};

export type BulkStaffItem = {
    first_name: string;
    last_name: string;
    email?: string;
};

type BulkUploadResponseBody = {
    uploaded_count: number;
};

function mapStaffItem(item: BackendStaffItem): StaffMember {
    return {
        id: item.id,
        firstName: item.first_name,
        lastName: item.last_name,
        fullName: item.full_name,
        email: item.email || null,
        role: item.role as Role,
        zone: item.geopolitical_zone as ZoneCode,
        zoneDisplay: item.zone_display,
    };
}

export async function fetchStaff(query: {
    q?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    zone?: string;
    role?: string;
    page?: number;
    limit?: number;
}): Promise<{ staff: StaffMember[]; total: number }> {
    const params = new URLSearchParams();

    if (query.q) params.set("q", query.q);
    if (query.email) params.set("email", query.email);
    if (query.firstName) params.set("first_name", query.firstName);
    if (query.lastName) params.set("last_name", query.lastName);
    if (query.zone) params.set("zone", query.zone);
    if (query.role) params.set("role", query.role);
    if (query.page) params.set("page", String(query.page));
    if (query.limit) params.set("limit", String(query.limit));

    const body = await apiFetch<StaffListResponseBody>(
        `/staff?${params.toString()}`
    );

    return {
        staff: body.staff.map(mapStaffItem),
        total: body.total,
    };
}

export async function bulkUploadStaff(
    items: BulkStaffItem[]
): Promise<number> {
    const body = await apiFetch<BulkUploadResponseBody>("/staff/bulk", {
        method: "POST",
        body: JSON.stringify({ staff: items }),
    });

    return body.uploaded_count;
}

export async function fetchZoneDistribution(): Promise<
    { zone: string; zoneDisplay: string; count: number }[]
> {
    const body = await apiFetch<
        { zone: string; zone_display: string; count: number }[]
    >("/zones/distribution");

    return body.map((item) => ({
        zone: item.zone,
        zoneDisplay: item.zone_display,
        count: item.count,
    }));
}
