export interface Book {
    id:              number;
    title:           string;
    description:     string;
    datePublished:   string;
    availableCopies: number;
    genre:           string;
    authors:         Author[];
}

export function isBook(o: unknown): o is Book {
    o
    // TODO: ...

    if (!(typeof o === "object"))
        return false;
    
    if (o === null) return false;

    if (!('id' in o)) return false;
    if (!(typeof o.id === 'number')) return false;

    o.id

    if (!("title" in o)) return false;
    if (typeof o.title !== 'string') return false;

    if (!("description" in o)) return false;
    if (typeof o.description !== 'string') return false;

    if (!("datePublished" in o)) return false;
    if (typeof o.datePublished !== 'string') return false;

    if (!("availableCopies" in o)) return false;
    if (typeof o.availableCopies !== 'number') return false;

    if (!("genre" in o)) return false;
    if (typeof o.genre !== 'string') return false;
    
    if (!("authors" in o)) return false;
    if (!Array.isArray(o.authors)) return false;

    return true
}


export type Author = {
    name: string
    // TODO: ...
}

export type Booking = {
    // TODO: ...
}
