export type NoteType = {
    id: string
    name: string;
    bgColor: string;
    textColor: string;
};

export type Note = {
    id: string;
    content: string;
    createdAt: Date;
    user: {
        name: string | null;
    };
    noteType: NoteType;
};
