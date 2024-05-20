import './BookList.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react"
import { getBooks } from './api'
import { BookWithAuthors } from './types';

const imagePlaceholder = "assets/book.jpg";


const BookList = () => {
    const [books, setBooks] = useState<BookWithAuthors[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filteredBooks, setFilteredBooks] = useState<BookWithAuthors[]>([]);

    useEffect(() => {
        getBooks()
            .then((data) => {
                setBooks(data);
                setFilteredBooks(data);
                console.log(data);
            })
            .catch((e: any) => console.error(e));
    }, []);

    function handleSearch() {
        if (searchTerm === "") {
            setFilteredBooks(books);
        } else {
            const filtered = books.filter(book =>
                book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.authors.some(author => author.fullName.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            setFilteredBooks(filtered);
        }
    }

    return (
        <div className="book-content">
            <div className="navigation_panel">
                <div className="navigation">
                    <ul>
                        <li>Recommendations</li>
                        <li>Popular</li>
                    </ul>
                </div>

                <div className="search-block">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleSearch}>Find</button>
                </div>
            </div>
            <div className="books_wrapper">

                {filteredBooks.map((book) => (
                    <div key={book.id} className="book">
                        <Link to={`/book/${book.id}`}>
                            <img src={book.imageUrl ?? imagePlaceholder} alt={book.title} />
                            <h2>{book.title}</h2>
                            <p>{book?.authors.map(author => author.fullName).join(', ')}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default BookList;
