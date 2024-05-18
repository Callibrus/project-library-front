import axios from "axios";
import apiConfig from "./apiConfig";
import endpoints from "./endpoints";
import { Book, Booking } from "../types/types";


export async function getBooks() {
    return new Promise<Book[]>((resolve, reject) => {
        axios.get(`${apiConfig.baseUrl}${endpoints.books.getBooks()}`)
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
        axios.get(`${apiConfig.baseUrl}${endpoints.books.getBook(id)}`)
            .then(response =>  {
                const data = response.data;
                data.datePublished = new Date(data.datePublished)
                resolve(data)
            })
            .catch(axiosError => reject(axiosError))
    })
}

export async function createBook(id: number) {
    console.error("NOT YET IMPLEMENTED")
    return;
    return new Promise<Book>((resolve, reject) => {
        axios(`${apiConfig.baseUrl}${endpoints.books.getBook(id)}`)
            .then(data => resolve(data.data))
            .catch(axiosError => reject(axiosError))
    })
}

export async function updateBook(id:number, newData: Book) {
    console.error("NOT YET IMPLEMENTED");
    id; newData;
    return;
    
}

export async function deleteBook(id: number) {
    return new Promise<Boolean>((resolve, reject) => {
        axios.delete(`${apiConfig.baseUrl}${endpoints.books.deleteBook(id)}`)
            .then(() => resolve(true))
            .catch(axiosError => reject(axiosError))
    })
}

export async function getBookings() {
    return new Promise<Booking[]>((resolve, reject) => {
        axios.get(`${apiConfig.baseUrl}${endpoints.bookings.getBookings}`)
            // TODO: asset response.data is Booking[]
            .then(response => resolve(response.data))
            .catch(axiosError => reject(axiosError))
    })
}

export async function getBooking(id: number) {
    return new Promise<Booking>((resolve, reject) => {
        axios.get(`${apiConfig.baseUrl}${endpoints.bookings.getBooking(id)}`)
            // TODO: assers response.data is Booking
            .then(response => resolve(response.data))
            .catch(axiosError => reject(axiosError));
    })
}

export async function createBooking(data: Booking) {
    console.error("NOT IMPLEMENTED YET")
    data;
    return;
}

export async function deleteBooking(id:number) {
    return new Promise<Boolean>((resolve, reject) => {
        axios.delete(`${apiConfig.baseUrl}${endpoints.bookings.deleteBooking(id)}`)
            .then(() => resolve(true))
            .catch(axiosError => reject(axiosError))
    })
}

export default {
    books: {getBooks, getBook, createBook, updateBook, deleteBook},
    bookings: {getBookings, getBooking, createBooking, deleteBooking}
}


// TODO: authors