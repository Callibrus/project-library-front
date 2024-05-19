import { useEffect, useState } from 'react';
import {Book} from './types';
import { Link, useParams } from 'react-router-dom';
import './BookDetail.css';
import { getBook } from './api';

const imagePlaceholder = "assets/book.jpg";



const BookDetail = () => {
    const [book, setBook] = useState<Book>()

    const { id } = useParams()

    useEffect(() => {
        getBook(id === undefined ? 1 : +id ).then(data => setBook(data)).catch(console.error);
    }, [])

    const [showFullDescription, setShowFullDescription] = useState(false);

    const BookDescription = () => {
        const maxChars = 450;
        const description = book?.description || '';
        const truncatedDescription = showFullDescription ? description : description.slice(0, maxChars);

        const handleToggleDescription = () => {
            setShowFullDescription(!showFullDescription);
        };

        return (
            <div>
                <p>{truncatedDescription}</p>
                {!showFullDescription && (
                    <button className="show-more-button" onClick={handleToggleDescription}>Показати ще</button>
                )}
                {showFullDescription && (
                    <button className="hide-button" onClick={handleToggleDescription}>Сховати</button>
                )}

            </div>
        );
    };

    return (
        <div className="book-content">
            <div className="top-bar">
                <Link to="/BookList/" className="back-button">&#10094;</Link>
                <button className="share-button">Поділитися</button>
            </div>

            <div className="book_detail">
                <div className="left-section">
                    <div className="image-container">
                        <img src={book?.imageUrl ?? imagePlaceholder} alt={book?.title}/>
                    </div>
                    <div className="book__nav">
                        <div className="author-info">
                            <img src="author-icon.png" alt="Author Icon"/>
                            <p>Author</p>

                        </div>
                        <div className="buttons">
                            <button className="save">Save</button>
                            <Link to={`/BookReservation/${id}`} className="reserve">Reserve</Link>
                        </div>
                    </div>

                </div>
                <div className="right-section">
                    <p>In stock</p>
                    <h2>{book?.title}</h2>
                    <p>Authors: {book?.authors.map(author => author.fullName).join(', ')}</p>

                    <p>Published: {book?.datePublished.toLocaleDateString()}</p>

                    <p>Genre: {book?.genre}</p>

                    <div>
                        <hr className="horizontal-line"/>
                        <p><BookDescription/></p>

                    </div>

                </div>

            </div>


            <div className="reviews">
                <h2>Reviews</h2>
                <div className="rating">
                </div>
                <div className="comments">
                    <div className="comment_wrapper">
                        <div className="avatar">
                            <img src="author-icon.png" alt=""/>
                        </div>
                        <div className="comment_content">
                            <h3>John Doe</h3>
                            <p>Main text of the comment goes here...</p>
                        </div>
                    </div>
                    <div className="comment_wrapper">
                        <div className="avatar">
                        </div>
                        <div className="comment_content">
                            <h3>Jane Smith</h3>
                            <p>Main text of the comment goes here...</p>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    );
};

export default BookDetail;

