export interface Task {
    id: bigint,
    name: string,
    period: bigint,
    person: string,
    personID: bigint,
    room: string,
    roomID: bigint,
    comment: string,
    finished: Date,
    due: Date,
    rotate: boolean
}

export interface Room {
    id: number,
    name: string,
    numExpired: bigint,
    numDue: bigint,
    numUpToDate: bigint
}

export function jsonParseNXT(json: string) {
    return JSON.parse(json, (key, value) => {
        if (typeof value === "number") if(value == Math.floor(value)) value = BigInt(value);
        if (typeof value === "string") {
            const d = new Date(value);
            if (d.toString() != "Invalid Date") return d;
        }
        return value;
    });
}