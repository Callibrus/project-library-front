import {useEffect, useState} from 'react';
import {Book} from './types';
import {Link, useParams} from 'react-router-dom';
import './BookAuthor.css';
import {getBook} from './api';


const BookDetail = () => {
    const [book, setBook] = useState<Book>();
    const {id} = useParams();

    useEffect(() => {
        getBook(id === undefined ? 1 : +id).then(data => setBook(data)).catch(console.error);
    }, [id]);


    return (
        <div className="book-content">
            <div className="top-bar">
                <Link to={`/BookDetail/${id}`} className="back-button">&#10094;</Link>
            </div>

            <div className="author_detail">
                <div className="left-section">
                    <div className="image-container">
                        {book && book.authors && book.authors[0] && (
                            <img src={book.authors[0].imageUrl} alt={book.authors[0].fullName}/>
                        )}


                    </div>
                </div>
                <div className="right-section">
                    {book && book.authors && book.authors[0] && (
                        <div>
                            <h2>Name: {book.authors[0].fullName}</h2>
                            <p>Birth Date: {new Date(book.authors[0].birthDate).toLocaleDateString()}</p>
                            <p>Death
                                Date: {book.authors[0].deathDate ? new Date(book.authors[0].deathDate).toLocaleDateString() : 'N/A'}</p>

                            <hr className="horizontal-line"/>
                            <h3>Biography:</h3>
                            <p id="biography">{book.authors[0].biography}</p>
                        </div>
                    )}


                </div>
            </div>

        </div>
    );
};

export default BookDetail;
