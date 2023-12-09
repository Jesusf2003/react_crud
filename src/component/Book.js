import React, {Component} from 'react';
import BookDataService from '../services/book.service';
import {withRouter} from "../common/with-router";

class Books extends Component {

    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.findBook = this.findBook.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateBook = this.updateBook.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
        this.state = {
            currentBook: {
                id: null,
                title: "",
                description: "",
                published: false
            },
            message: ""
        }
    }

    componentDidMount() {
        this.findBook(this.props.router.params.id);
    }

    onChangeTitle(e) {
        const title = e.target.value;
        this.setState(function(prevState) {
            return {
                currentBook: {
                    ...prevState.currentBook,
                    title: title
                }
            }
        })
    }

    onChangeDescription(e) {
        const description = e.target.value;
        this.setState(prevState => ({
            currentBook: {
                ...prevState.currentBook,
                description: description
            }
        }))
    }

    findBook(id) {
        BookDataService.findById(id)
            .then(res => {
                this.setState({
                    currentBook: res.data
                });
                console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updatePublished(status) {
        let data = {
            id: this.state.currentBook.id,
            title: this.state.currentBook.title,
            description: this.state.currentBook.description,
            published: status
        }
        BookDataService.update(this.state.currentBook.id, data)
            .then(res => {
                this.setState(prevState => ({
                    currentBook: {
                        ...prevState.currentBook,
                        published: status
                    }
                }));
                console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    updateBook() {
        BookDataService.update(this.state.currentBook.id, this.state.currentBook)
            .then(res => {
                console.log(res.data);
                this.setState({
                    message: "El libro fué actualizado exitósamente!"
                })
            })
            .catch(e => {
                console.log(e);
            })
    }

    deleteBook() {
        BookDataService.setUnpublished(this.state.currentBook.id)
            .then(res => {
                console.log(res.data);
                this.props.router.navigate('/books')
            })
            .catch(e => {
                console.log(e);
            })
    }

    render() {
        const {currentBook} = this.state;
        return (
            <div>
                {currentBook ? (<div className="edit-form">
                    <h4>Libros</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Título</label>
                            <input type="text" className="form-control" id="title" value={currentBook.title} onChange={this.onChangeTitle} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Descripción</label>
                            <input type="text" className="form-control" id="description" value={currentBook.description} onChange={this.onChangeDescription} />
                        </div>
                        <div className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {currentBook.published ? "Published" : "Pending"}
                        </div>
                    </form>
                    {currentBook.published ? (
                        <button className="badge badge-primary mr-2" onClick={() => this.updatePublished(false)}>No publicado</button>
                    ) : (
                        <button className="badge badge-primary mr-2" onClick={() => this.updatePublished(true)}></button>
                    )}
                    <button className="badge badge-danger mr-2" onClick={this.deleteBook}>Eliminar</button>
                    <button type="submit" className="badge badge-success" onClick={this.updateBook}>Actualizar</button>
                    <p>{this.state.message}</p>
                </div>) : (<div>
                    <br />
                    <p>Por favor, seleccione un libro</p>
                </div>)}
            </div>
        );
    }
}

export default withRouter(Books);
