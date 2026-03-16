export type NoteType = {
    id: string
    name: string;
    bgColor: string;
    textColor: string;
};

export type NoteFile = {
    id: string;
    file: {
        id: string;
        name: string;
        objectName: string;
        bucketName: string;
        thumbnailObjectName: string | null;
        thumbnailBucketName: string | null;
        mimeType: string;
        size: number;
    };
    url?: string;
    thumbnailUrl?: string;
};

export type Note = {
    id: string;
    content: string;
    createdAt: Date;
    user: {
        name: string | null;
    };
    noteType: NoteType;
    files?: NoteFile[];
};
