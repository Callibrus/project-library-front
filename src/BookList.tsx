import './BookList.css';
import { Link } from 'react-router-dom';
import { useEffect, useState }  from "react"
import { getBooks} from './api'
import { Book } from './types';

const imagePlaceholder = "assets/book.jpg";


const BookList = () => {
    const [books, setBooks] = useState<Book[]>([]);
    
    useEffect(() => {
        getBooks()
            .then((data) => { setBooks(data); console.log(data)} )
            .catch((e: any) => console.error(e));
    }, []);

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
                    <input type="text" placeholder="Search..."/>
                    <button>Find</button>
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
