import axios from "axios";
import apiConfig from "./apiConfig";
import endpoints from "./endpoints";
import { Author, Book, Booking } from "../types";

const BASE_URL = apiConfig.baseUrl;

export async function getBooks() {
    return new Promise<(Book)[]>((resolve, reject) => {
        axios.get(`${BASE_URL}${endpoints.books.getBooks()}`)
            .then((response) => {
                let data = response.data as Object[];
                
                data.forEach((b:any) => {
                    b.datePublished = new Date(b.datePublished)
                })

                resolve(data as any)    
            })
            .catch(axiosError => reject(axiosError))
    })
}

export async function getBook(id: number) {
    return new Promise<Book>((resolve, reject) => {
        axios.get(`${BASE_URL}${endpoints.books.getBook(id)}`)
            .then(response =>  {
                const data = response.data;
                data.datePublished = new Date(data.datePublished)
                resolve(data)
            })
            .catch(axiosError => reject(axiosError))
    })
}

export async function createBook(id: number) {
    throw new Error("NOT YET IMPLEMENTED")
    return new Promise<Book>((resolve, reject) => {
        axios(`${BASE_URL}${endpoints.books.getBook(id)}`)
            .then(data => resolve(data.data))
            .catch(axiosError => reject(axiosError))
    })
}

export async function updateBook(id:number, newData: Book) {
    throw new Error("NOT YET IMPLEMENTED");
    newData; id;
    
}

export async function deleteBook(id: number) {
    return new Promise<true>((resolve, reject) => {
        axios.delete(`${BASE_URL}${endpoints.books.deleteBook(id)}`)
            .then(() => resolve(true))
            .catch(axiosError => reject(axiosError))
    })
}

export async function getBookings() {
    console.log(`${BASE_URL}${endpoints.bookings.getBookings()}`)
    return new Promise<Booking[]>((resolve, reject) => {
        axios.get(`${BASE_URL}${endpoints.bookings.getBookings()}`)
            .then(response => resolve(response.data))
            .catch(axiosError => reject(axiosError))
    })
}

export async function getBooking(id: number) {
    console.log(`${BASE_URL}${endpoints.bookings.getBooking(id)}`)
    return new Promise<Booking>((resolve, reject) => {
        axios.get(`${BASE_URL}${endpoints.bookings.getBooking(id)}`)
            .then(response => resolve(response.data))
            .catch(axiosError => reject(axiosError));
    })
}

export async function createBooking(booking: {bookId: number, startTime: Date, endTime: Date, username: string, id?: number }) {
    const offset = booking.startTime.getTimezoneOffset()
    booking.startTime = new Date(booking.startTime.getTime() - (offset * 60 * 1000))
    booking.endTime = new Date(booking.endTime.getTime() - (offset * 60 * 1000))
    return new Promise((resolve, reject) => {
        axios.post(`http://109.120.134.98:8080/api/booking/create`,
                    {
                        bookId: booking.bookId,
                        startTime: booking.startTime.toISOString(),
                        endTime: booking.endTime.toISOString(),
                        userName: booking.username
                    })
                    .then(response => resolve(response.data))
                    .catch(axiosError => reject(axiosError))
    });
}

export async function deleteBooking(id:number) {
    return new Promise<true>((resolve, reject) => {
        axios.delete(`http://109.120.134.98:8080/api/booking/delete/${id}`)
            .then(() => resolve(true))
            .catch(axiosError => reject(axiosError))
    })
}

export async function getBookingsForBook(id: number) {
    return new Promise<Booking[]>((resolve, reject) => {
        axios.get(`${BASE_URL}${endpoints.bookings.getBookingsForBook(id)}`)
            .then(response => {
                const data = response.data as Booking[]
                data.forEach(booking => {
                    booking.startTime = new Date(booking.startTime)
                    booking.endTime = new Date(booking.endTime)
                })
                resolve(data)
            })
            .catch(axiosError => reject(axiosError));
    })
}



export async function getAuthors() {
    return new Promise<Author[]>((resolve, reject) => {
        axios.get(`${BASE_URL}${endpoints.authors.getAuthors}`)
            .then((response) => {
                const data = response.data as Author[]
                data.forEach((author) => {
                    author.birthDate = new Date(author.birthDate);
                    author.deathDate = author.deathDate ? new Date(author.deathDate) : null;
                })

                resolve(data);
            })
            .catch(axiosError => reject(axiosError))
    })
}

export async function getAuthor(id: number) {
    return new Promise<Author>((resolve, reject) => {
        axios.get(`${BASE_URL}${endpoints.authors.getAuthor(id)}`)
            .then(respose => {
                const data = respose.data as Author;
                data.birthDate = new Date(data.birthDate);
                data.deathDate = data.deathDate ? new Date(data.deathDate) : null;
                resolve(data)
            })
            .catch(axiosError => reject(axiosError))
    })
}

export async function updateAuthor(id: number, body: Author) {
    throw new Error("NOT YET IMPLEMENTED");
    id; body;

}

export async function createAuthor(body:Author) {
    throw new Error("NOT YET IMPLEMENTED");
    body;

}

export async function deleteAuthor(id:number) {
    return new Promise<true>((resolve, reject) => {
        axios.delete(`${BASE_URL}${endpoints.authors.deleteAuthor(id)}`)
            .then(() => resolve(true))
            .catch(axiosError => reject(axiosError))
    })
}



export default {
    books: {getBooks, getBook, createBook, updateBook, deleteBook},
    author: {getAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor},
    bookings: {getBookings, getBooking, createBooking, deleteBooking},
}
