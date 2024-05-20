import { useEffect, useState } from 'react';
import { BookWithAuthors } from './types';
import { Link, useParams } from 'react-router-dom';
import './BookDetail.css';
import { getBook } from './api';

const imagePlaceholder = "assets/book.jpg";

const BookDetail = () => {
    const [book, setBook] = useState<BookWithAuthors>();
    const { id } = useParams();

    useEffect(() => {
        getBook(id === undefined ? 1 : +id).then(data => setBook(data)).catch(console.error);
    }, [id]);

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
                    <button className="show-more-button" onClick={handleToggleDescription}>Show more</button>
                )}
                {showFullDescription && (
                    <button className="hide-button" onClick={handleToggleDescription}>Show less</button>
                )}
            </div>
        );
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: book?.title,
                    text: book?.description,
                    url: window.location.href,
                });
                console.log('Content shared successfully');
            } catch (error) {
                console.error('Error sharing content:', error);
            }
        } else {
            console.error('Web Share API is not supported in this browser');
        }
    };

    return (
        <div className="book-content">
            <div className="top-bar">
                <Link to="/BookList/" className="back-button">&#10094;</Link>
                <button className="share-button" onClick={handleShare}>Share</button>
            </div>

            <div className="book_detail">
                <div className="left-section">
                    <div className="image-container">
                        <img src={book?.imageUrl ?? imagePlaceholder} alt={book?.title} />
                    </div>
                    <div className="book__nav">
                        <Link to = {`/BookAuthor/${id}`} className="author-info">
                            <img width="64" height="64" src="https://img.icons8.com/cotton/64/person-male--v2.png" alt="person-male--v2" />
                            <p>Author</p>
                        </Link>
                        <div className="buttons">
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
                        <hr className="horizontal-line" />
                        <p><BookDescription /></p>
                    </div>
                </div>
            </div>

            <div className="reviews">
                <h2>Reviews</h2>
                <div className="rating"></div>
                <div className="comments">
                    <div className="comment_wrapper">
                        <div className="avatar">
                            <img width="30" height="30"
                                 src="https://img.icons8.com/ios-glyphs/30/000000/person-male.png" alt="person-male"/>
                        </div>
                        <div className="comment_content">
                        <h3>John Doe</h3>
                            <p>Main text of the comment goes here...</p>
                        </div>
                    </div>
                    <div className="comment_wrapper">
                        <div className="avatar">
                            <img width="30" height="30"
                                 src="https://img.icons8.com/ios-glyphs/30/000000/person-male.png" alt="person-male"/>
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
