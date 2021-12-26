import http from '../utils/http'

class BookService {
    getAll(pageNumber,pageSize,sortDir,sortBy){
        return http.get(`/books?pageNumber=${pageNumber}&pageSize=${pageSize}&sortDir=${sortDir}&sortBy=${sortBy}`);
    }
    
    get(id){
        return http.get(`/books/${id}`);
    }

    create(data){
        return http.post("/books",data);
    }

    delete(id){
        return http.delete(`/books/${id}`);
    }

    update(data){
        return http.put('/books',data);
    }
}

export default new BookService();