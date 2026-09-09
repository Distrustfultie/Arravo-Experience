import { BulkStaffItem } from "@/lib/staff";

function parseCsvLine(line: string): string[] {
    const cells: string[] = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (inQuotes) {
            if (char === '"' && line[i + 1] === '"') {
                current += '"';
                i++;
            } else if (char === '"') {
                inQuotes = false;
            } else {
                current += char;
            }
        } else if (char === '"') {
            inQuotes = true;
        } else if (char === ",") {
            cells.push(current);
            current = "";
        } else {
            current += char;
        }
    }

    cells.push(current);
    return cells.map((cell) => cell.trim());
}

/**
 * Parses a staff CSV with a required header row and fixed column order:
 * first_name, last_name, email (email optional) — matching the backend's
 * documented (but unwired) /staff/bulk/csv format.
 */
export function parseStaffCsv(text: string): BulkStaffItem[] {
    const lines = text
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

    if (lines.length < 2) {
        throw new Error(
            "CSV must have a header row and at least one staff row"
        );
    }

    const items: BulkStaffItem[] = [];

    for (const line of lines.slice(1)) {
        const cells = parseCsvLine(line);

        if (cells.length < 2 || !cells[0] || !cells[1]) {
            throw new Error(
                "Each CSV row needs at least: first_name, last_name"
            );
        }

        const item: BulkStaffItem = {
            first_name: cells[0],
            last_name: cells[1],
        };

        if (cells[2]) {
            item.email = cells[2];
        }

        items.push(item);
    }

    return items;
}
