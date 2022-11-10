export interface File  {
    name: string;
    lastModified: string;
    size: number;
}
export interface Bucket  {
    id?: number;
    name: string;
    location: string;
    storageSize: number,
    files?: {
        [key: number]: File;
    };
}
