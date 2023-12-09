import React, {Component} from 'react';
import BookDataService from '../services/book.service';

export default class BookAdd extends Component {

    constructor(props) {
        super(props)
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.insertBook = this.insertBook.bind(this);
        this.newBook = this.newBook.bind(this);
        this.state = {
            id: null,
            title: "",
            description: "",
            submitted: false
        };
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    insertBook() {
        let data = {
            title: this.state.title,
            description: this.state.description
        }
        BookDataService.insert(data)
            .then(res => {
                this.setState({
                    id: res.data.id,
                    title: res.data.title,
                    description: res.data.description,
                    published: res.data.published,
                    submitted: true
                });
                console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    newBook() {
        this.setState({
            id: null,
            title: "",
            description: "",
            submitted: false
        })
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (<div>
                    <h4>Se ha registrado exitósamente</h4>
                    <button className="btn btn-success" onClick={this.newBook}>Ingresar</button>
                </div>) : (<div>
                    <div className="form-group">
                        <label htmlFor="title">Título</label>
                        <input type="text" className="form-control" id="title" required value={this.state.title} onChange={this.onChangeTitle} name="title" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Descripción</label>
                        <input type="text" className="form-control" id="description" required value={this.state.description} onChange={this.onChangeDescription} name="description" />
                    </div>

                    <button onClick={this.insertBook} className="btn btn-success">Ingresar</button>
                </div>)}
            </div>
        );
    }
}
