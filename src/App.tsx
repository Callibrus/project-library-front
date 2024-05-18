import './App.css';
import { useEffect }  from "react"
import {getBooks} from './api'


function App() {

    useEffect(() => {
        getBooks()
            .then((data: any) => console.log(data))
            .catch((e: any) => console.log(e));
    })

    return (
        <div>
            <h1>Callibrus. The library of the future!</h1>
            <h2> Coming soon... </h2>
        </div>

    );
}

export default App;