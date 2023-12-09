import {Component} from "react";
import BookDataService from '../services/book.service';
import {Link} from "react-router-dom";

export default class BookList extends Component {

    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveBooks = this.retrieveBooks.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveBook = this.setActiveBook.bind(this);
        this.searchTitle = this.searchTitle.bind(this);
        this.state = {
            books: [],
            currentBook: null,
            currentIndex: -1,
            searchTitle: ""
        }
    }

    componentDidMount() {
        this.retrieveBooks();
    }

    onChangeSearchTitle(e) {
        const search = e.target.value;
        this.setState({
            searchTitle: search
        })
    }

    retrieveBooks() {
        BookDataService.findAll()
            .then(res => {
                this.setState({
                    books: res.data
                });
                console.log(res.data)
            })
            .catch(e => {
                console.log(e);
            })
    }

    refreshList() {
        this.retrieveBooks();
        this.setState({
            currentBook: null,
            currentIndex: -1
        });
    }

    setActiveBook(data, index) {
        this.setState({
            currentBook: data,
            currentIndex: index
        })
    }

    searchTitle() {
        this.setState({
            currentBook: null,
            currentIndex: -1
        })
        BookDataService.searchByTitle(this.state.searchTitle)
            .then(res => {
                this.setState({
                    books: res.data
                })
                console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    render() {
        const {searchTitle, books, currentBook, currentIndex} = this.state;
        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Filtrar por título"
                            value={searchTitle}
                            onChange={this.onChangeSearchTitle}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchTitle}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Lista de libros</h4>
                    <ul className="list-group">
                        {books &&
                            books.map((book, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveBook(book, index)}
                                    key={index}
                                >
                                    {book.title}
                                </li>
                            ))}
                    </ul>
                </div>
                <div className="col-md-6">
                    {currentBook ? (
                        <div>
                            <h4>Tutorial</h4>
                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label>{" "}
                                {currentBook.title}
                            </div>
                            <div>
                                <label>
                                    <strong>Description:</strong>
                                </label>{" "}
                                {currentBook.description}
                            </div>
                            <div>
                                <label>
                                    <strong>Status:</strong>
                                </label>{" "}
                                {currentBook.published ? "Published" : "Pending"}
                            </div>
                            <Link to={"/books/" + currentBook.id} className="btn btn-warning btn-sm">Editar</Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Por favor, seleccionar un libro...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
