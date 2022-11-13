export interface INews {
    id: number;
    score: number;
    title: string;
    by: string;
    time: number | string;
    kids?: number[];
    text?: string;
    url: string;
}

