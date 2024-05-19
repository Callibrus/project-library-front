import { useState, ChangeEvent } from 'react';
import { Book } from './types/types';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './BookReservation.css';

const imagePlaceholder = "assets/book.jpg";

const book: Book = {
    id: 1,
    title: "Sample Book",
    description: "«Жовтолика» — перший твір Ребекки Кван, у якому вона відходить від епічності, фентезійності й\n" +
        "                            експериментує з жанром сатиричного роману. Це історія про спокуси, пристрасті й конфлікти у\n" +
        "                            світі літераторів і видавців. Про омріяність слави і ціну, яку за це готова заплатити\n" +
        "                            людина. Про заздрощі, плітки, плагіат, расизм просто і расизм \"навпаки\".\n" +
        "                            Атена Лю і Джуніпер Гейворд разом навчалися в Єлі, відвідували письменницький курс і мали б\n" +
        "                            одночасно зійти на вершину слави. Але Атена — справжня літературна зірка з шестизначними\n" +
        "                            гонорарами, а про Джуніпер майже ніхто й не чув.",
    datePublished: new Date("2024-04-18"),
    availableCopies: 100,
    genre: "Fiction",
    imageUrl: "author-icon.png",
    authors: [
        {
            id: 1,
            fullName: "John Doe",
            birthDate: new Date("1990-01-01"),
            deathDate: null,
            biography: "Lorem ipsum...",
            imageUrl: null
        },
        {
            id: 2,
            fullName: "Jane Smith",
            birthDate: new Date("1995-02-15"),
            deathDate: null,
            biography: "Lorem ipsum...",
            imageUrl: null
        }
    ]
};

const BookDetail = () => {
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [reminder, setReminder] = useState<boolean>(false);

    const handleStartDateChange = (date: Date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date: Date | null) => {
        setEndDate(date);
    };

    const handleReminderChange = (e: ChangeEvent<HTMLInputElement>) => {
        setReminder(e.target.checked);
    };

    return (
        <div className="book-content">
            <div className="top-bar">
                <Link to="/BookDetail" className="back-button">&#10094;</Link>
                <button className="share-button">Поділитися</button>
            </div>

            <div className="book_detail">
                <div className="left-section">
                    <div className="image-container">
                        <img src={book.imageUrl ?? imagePlaceholder} alt={book.title}/>
                    </div>
                    <div className="book__nav">
                        <div className="buttons">
                            <button className="reserve2">Reserve</button>
                        </div>
                    </div>
                </div>
                <div className="right-section">
                    <p>In stock</p>
                    <h2>{book.title}</h2>
                    <p>Authors: {book.authors.map(author => author.fullName).join(', ')}</p>
                    <p>Published: {book.datePublished.toLocaleDateString()}</p>
                    <p>Genre: {book.genre}</p>
                    <div>
                        <hr className="horizontal-line"/>
                    </div>
                    <div className="reservation">
                        <div className="date-picker">
                            <label htmlFor="startDate">Pick up date:</label>
                            <DatePicker
                                selected={startDate}
                                onChange={handleStartDateChange}
                                dateFormat="dd/MM/yyyy"
                                id="startDate"
                            />
                        </div>
                        <div className="date-picker">
                            <label htmlFor="endDate">Return date:</label>
                            <DatePicker
                                selected={endDate}
                                onChange={handleEndDateChange}
                                dateFormat="dd/MM/yyyy"
                                id="endDate"
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
