import { useState, ChangeEvent, useEffect } from 'react';
import { Book, Booking } from './types';
import { Link, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './BookReservation.css';
import { createBooking, getBook, getBookingsForBook } from './api';

const imagePlaceholder = "assets/book.jpg";

const BookDetail = () => {
    const [book, setBook] = useState<Book>();

    const { id } = useParams();

    const [bookings, setBookings] = useState<Booking[]>([]);
    useEffect(() => {
        const bookId = id === undefined ? 1 : +id;
        getBook(bookId).then(data => setBook(data)).catch(console.error);
        getBookingsForBook(bookId).then(data => setBookings(data)).catch(console.error);
    }, [id]);

    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [reminder, setReminder] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");

    const handleStartDateChange = (date: Date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date: Date | null) => {
        setEndDate(date);
    };

    const handleReminderChange = (e: ChangeEvent<HTMLInputElement>) => {
        setReminder(e.target.checked);
    };

    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const reserve = () => {
        if (startDate && endDate && username) {
            createBooking({
                bookId: id === undefined ? 1 : +id,
                startTime: startDate,
                endTime: endDate,
                userName: username
            }).then(() => {
                alert('Reservation successful!');

                getBookingsForBook(id === undefined ? 1 : +id).then(data => setBookings(data)).catch(console.error);
            }).catch(error => {
                console.error('Error creating booking:', error);
                alert('Failed to create reservation.');
            });
        } else {
            alert('Please fill in all fields.');
        }
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
                <Link to={`/BookDetail/${id}`} className="back-button">&#10094;</Link>
                <button className="share-button" onClick={handleShare}>Share</button>
            </div>

            <div className="book_detail">
                <div className="left-section">
                    <div className="image-container">
                        <img src={book?.imageUrl ?? imagePlaceholder} alt={book?.title} />
                    </div>
                    <div className="book__nav">
                        <div className="buttons">
                            <button className="reserve2" onClick={reserve}>Reserve</button>
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
                    </div>
                    <div className="reservation">
                        <div >
                            <input
                                className="username-input"
                                type="text"
                                placeholder="Username"
                                onChange={handleUsernameChange}
                            />
                        </div>
                        <div className="date-picker">
                            <label htmlFor="startDate">Pick up date:</label>
                            <DatePicker
                                selected={startDate}
                                onChange={handleStartDateChange}
                                dateFormat="dd/MM/yyyy"
                                id="startDate"
                                minDate={new Date()}
                                excludeDates={bookings.flatMap(booking => {
                                    const dates = [];
                                    // console.log(booking);
                                    const currentDate = new Date(booking.startTime);
                                    const endDate = new Date(booking.endTime);
                                    while (currentDate <= endDate) {
                                        dates.push(new Date(currentDate));
                                        currentDate.setDate(currentDate.getDate() + 1);
                                    }
                                    return dates;
                                })}
                            />
                        </div>
                        <div className="date-picker">
                            <label htmlFor="endDate">Return date:</label>
                            <DatePicker
                                selected={endDate}
                                onChange={handleEndDateChange}
                                dateFormat="dd/MM/yyyy"
                                id="endDate"
                                minDate={new Date()}
                                excludeDates={bookings.flatMap(booking => {
                                    const dates = [];
                                    const currentDate = new Date(booking.startTime);
                                    const endDate = new Date(booking.endTime);
                                    while (currentDate <= endDate) {
                                        dates.push(new Date(currentDate));
                                        currentDate.setDate(currentDate.getDate() + 1);
                                    }
                                    return dates;
                                })}
                            />
                        </div>
                        <div className="reminder-checkbox">
                            <input
                                type="checkbox"
                                id="reminder"
                                checked={reminder}
                                onChange={handleReminderChange}
                            />
                            <label htmlFor="reminder">Add a reminder</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;
