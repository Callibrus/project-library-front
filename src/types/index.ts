export type Book = {
    id:              number,
    title:           string,
    description:     string,
    datePublished:   Date,
    availableCopies: number,
    genre:           string,
    imageUrl:        string,
}


export type Author = {
    id: number
    fullName: string,
    birthDate: Date,
    deathDate: Date | null,
    biography: string
    imageUrl: string | null
}

export type Booking = {
    id: number, 
    startTime: Date,
    endTime: Date,
    bookId: number,
    userName: string
}


export type BookWithAuthors = Book & {authors: Author[]}
export type AuthorWithBooks = Author & {books: Book[]}