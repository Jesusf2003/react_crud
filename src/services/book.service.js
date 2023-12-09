import http from "../http-common"

class BookDataService {

    url = "http://localhost:8080/api/books";

    findAll() {
        return http.get(`${this.url}/findAll`);
    }

    findById (id) {
        return http.get(`${this.url}/${id}`);
    }

    findAllByPusblished(id) {
        return http.get(`${this.url}/published`);
    }

    searchByTitle(title) {
        return http.get(`${this.url}/findAll?title=${title}`);
    }

    insert(data) {
        return http.post(`${this.url}`, data);
    }

    update(id, data) {
        return http.put(`${this.url}/${id}`, data);
    }

    setUnpublished(id) {
        return http.delete(`${this.url}/${id}`);
    }
}

export default new BookDataService();
