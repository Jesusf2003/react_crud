import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {Component} from "react";
import {Link, Route, Routes} from "react-router-dom";
import BookList from "./component/BookList";
import BookAdd from "./component/BookAdd";
import Books from "./component/Book";

export default class App extends Component {

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={"/books"} className="navbar-brand">
                        Fernando
                    </Link>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/books"} className="nav-link">
                                Libros
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/add"} className="nav-link">Insertar</Link>
                        </li>
                    </div>
                </nav>
                <div className="container mt-3">
                    <Routes>
                        <Route path="/" element={<BookList />} />
                        <Route path="/books" element={<BookList />} />
                        <Route path="/add" element={<BookAdd />} />
                        <Route path="/books/:id" element={<Books />} />
                    </Routes>
                </div>
            </div>
        );
    }
}
