export default {
    books: {
        getBooks: () => `/books`,
        getBook: (id: Number) =>  `/book/${id}`,
        createBook: () => `/book/create`,
        updateBook: (id: Number) => `/book/update/${id}`,
        deleteBook: (id: Number) => `/book/delete/${id}`,
    },

    bookings: {
        getBookings: () => `/bookings`,
        getBooking: (id: Number) => `/booking/${id}`,
        createBooking: () => `/booking/create`,
        deleteBooking: (id: Number) => `/booking/delete/${id}`
    },

    authors: {
        getAuthors: () => `/authors`,
        getAuthor: (id: number) => `/author/${id}`,
        updateAuthor: (id: number) => `/author/update/${id}`,
        createAuthor: () => `/author/create`,
        deleteAuthor: (id: number) => `/author/delete${id}`
    }
}
