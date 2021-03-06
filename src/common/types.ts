export interface PairIDName {
    _id: string;
    name: string;
}

export interface Overlay {
    id: string;
    name: string;
    mustReturn: boolean;
    popOut: boolean;
}

export interface TaskFilter {
    personID: string[];
    roomID: string;
    dayFilter: number;
}

export interface Task {
    _id: string;
    name: string;
    period: number;
    personID: string;
    roomID: string;
    finished: string[];
    rotate?: boolean;
    rotateGroup?: string[];
    comment?: string;
}
