import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import BookList from './BookList';
import BookDetail from './BookDetail';
import BookReservation from './BookReservation.tsx';
import BookAuthor from './BookAuthor.tsx';

function App() {

    return (
        <Router>
            <div className="app">
                <div className="top-panel">
                    <h1>Callibrus</h1>
                </div>


                <div className="content">
                    <Routes>
                        <Route path="/" element={<BookList />} />
                        <Route path="/BookList" element={<BookList />} />
                        <Route path="/book/:id" element={<BookDetail  />} />
                        <Route path="/BookReservation/:id" element={<BookReservation />} />
                        <Route path="/BookDetail/:id" element={<BookDetail />} />
                        <Route path="/BookAuthor/:id" element={<BookAuthor />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;