import './BookList.css';
import { Link } from 'react-router-dom';
// import { useEffect, useState }  from "react"
// import {getBook, getBooks} from './api'
// import { Book } from './types/types';

const imagePlaceholder = "assets/book.jpg";


const BookList = () => {
    // const [books, setBooks] = useState<Book[]>([]);
    //
    // useEffect(() => {
    //     getBooks()
    //         .then((data) => { setBooks(data); console.log(data)} )
    //         .catch((e: any) => console.error(e));
    // }, []);

    const books = [
        { id: 1, title: 'Book Title 1', author: 'Author 1', imageUrl: 'assets/book.jpg' },
        { id: 2, title: 'Book Title 2', author: 'Author 2', imageUrl: 'assets/book.jpg' },
        { id: 3, title: 'Book Title 3', author: 'Author 3', imageUrl: 'assets/book.jpg' },
        { id: 4, title: 'Book Title 4', author: 'Author 4', imageUrl: 'assets/book.jpg' },
        { id: 5, title: 'Book Title 5', author: 'Author 5', imageUrl: 'assets/book.jpg' },
        { id: 6, title: 'Book Title 6', author: 'Author 6', imageUrl: 'assets/book.jpg' },
        { id: 7, title: 'Book Title 7', author: 'Author 7', imageUrl: 'assets/book.jpg' },
        { id: 8, title: 'Book Title 8', author: 'Author 8', imageUrl: 'assets/book.jpg' },
        { id: 9, title: 'Book Title 9', author: 'Author 9', imageUrl: 'assets/book.jpg' },
        { id: 10, title: 'Book Title 10', author: 'Author 10', imageUrl: 'assets/book.jpg' },
    ];

    return (
        <div className="book-content">
            <div className="navigation_panel">
                <div className="navigation">
                    <ul>
                        <li>Рекомендації</li>
                        <li>Популярні</li>
                    </ul>
                </div>

                <div className="search-block">
                    <input type="text" placeholder="Search..."/>
                    <button>Знайти</button>
                </div>
            </div>
            <div className="books_wrapper">

                {books.map((book) => (
                    <div key={book.id} className="book">
                        <Link to={`/book/${book.id}`}>
                            <img src={book.imageUrl ?? imagePlaceholder} alt={book.title}/>
                            <h2>{book.title}</h2>
                        </Link>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default BookList;
