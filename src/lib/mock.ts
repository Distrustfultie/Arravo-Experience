import { Employee } from "@/types";

export const mockEmployees: Employee[] = [
    {
        id: "1",
        employeeId: "ARR001",
        fullName: "John Smith",
        companyEmail: "john.smith@arravo.com",
        department: "Technology",
        zone: "SOUTHWEST",
        discovered: true
    },
    {
        id: "2",
        employeeId: "ARR002",
        fullName: "Jane Ade",
        companyEmail: "jane.ade@arravo.com",
        department: "Finance",
        zone: "NORTH",
        discovered: false
    },
    {
        id: "3",
        employeeId: "ARR003",
        fullName: "David Okafor",
        companyEmail: "david.okafor@arravo.com",
        department: "Operations",
        zone: "SOUTHEAST",
        discovered: true
    },
    {
        id: "4",
        employeeId: "ARR004",
        fullName: "Mary Johnson",
        companyEmail: "mary.johnson@arravo.com",
        department: "People",
        zone: "SOUTH-SOUTH",
        discovered: false
    }
];

export const normalize = (v: string) => v.trim().replace(/\s+/g, " ").toLowerCase();

export const verifyEmployee = (name: string, email: string) => mockEmployees.find(e => normalize(e.fullName) === normalize(name) && normalize(e.companyEmail) === normalize(email)) ?? null;