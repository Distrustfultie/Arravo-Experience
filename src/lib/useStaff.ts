"use client";

import { useCallback, useEffect, useState } from "react";

import { ApiError } from "@/lib/api";
import { fetchStaff } from "@/lib/staff";
import { StaffMember } from "@/types";

export function useStaff() {
    const [staff, setStaff] = useState<StaffMember[]>([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const refetch = useCallback(async () => {
        setIsLoading(true);
        setError("");

        try {
            const result = await fetchStaff({ limit: 200 });
            setStaff(result.staff);
            setTotal(result.total);
        } catch (err) {
            setError(
                err instanceof ApiError
                    ? err.message
                    : "Could not load participants."
            );
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        refetch();
    }, [refetch]);

    return { staff, total, isLoading, error, refetch };
}
