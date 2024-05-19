import './App.css';
import { useEffect, useState }  from "react"
import { createBooking, getBookings, getBooks} from './api'
import { Book } from './types';

const imagePlaceHlolder = "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1553383690i/2657.jpg"

function App() {
    
    const [books, setBooks] = useState<Book[]>([]); 

    useEffect(() => {
        getBooks()
            .then((data) => { setBooks(data); console.log(data)} )
            .catch((e: any) => console.error(e));

        // createBooking({
        //     bookId: 1,
        //     startTime: new Date(),
        //     endTime: new Date(),
        //     username: "test"
        // })
        getBookings()
        .then(console.log)
        .catch(console.error)
    }, []);

    // const books = [
    //     { id: 1, title: 'Book Title 1', author: 'Author 1', image: 'path/to/image1.jpg' },
    //     { id: 2, title: 'Book Title 2', author: 'Author 2', image: 'path/to/image2.jpg' },
    //     { id: 3, title: 'Book Title 3', author: 'Author 3', image: 'path/to/image3.jpg' },
    //     { id: 4, title: 'Book Title 4', author: 'Author 4', image: 'path/to/image4.jpg' },
    //     { id: 5, title: 'Book Title 5', author: 'Author 5', image: 'path/to/image5.jpg' },
    //     { id: 6, title: 'Book Title 6', author: 'Author 6', image: 'path/to/image6.jpg' },
    //     { id: 7, title: 'Book Title 7', author: 'Author 7', image: 'path/to/image7.jpg' },
    //     { id: 8, title: 'Book Title 8', author: 'Author 8', image: 'path/to/image8.jpg' },
    //     { id: 9, title: 'Book Title 9', author: 'Author 9', image: 'path/to/image9.jpg' },
    //     { id: 10, title: 'Book Title 10', author: 'Author 10', image: 'path/to/image10.jpg' },
    // ];

    return (
        <div className="app">
            <div className="top-panel">
                <h1>Callibrus</h1>
            </div>

            <div className="navigation_panel">
                <div className="navigation">
                    <ul>
                        <li>Рекомендації</li>
                        <li>Популярні</li>
                    </ul>
                </div>

                <div className="search-block">
                    <input type="text" placeholder="Search..." />
                    <button>Знайти</button>
                </div>
            </div>

            <div className="content">
                <div className="books_wrapper">
                    {books.map((book) => (
                        <div key={book.id} className="book">
                            <img src={book.imageUrl ?? imagePlaceHlolder} alt={book.title} />
                            <h2>{book.title}</h2>
                            <p>{book.authors[0]?.fullName ?? "Author placeholder"}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
}

export default App;
