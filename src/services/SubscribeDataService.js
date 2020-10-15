// Tutorial Data Service
import http from "../http-common";

class SubscribeDataService {
    getAll() {
        return http.get("/subscribers");
    }
    get(id) {
        return http.get(`/subscribers/${id}`);
    }
    create(data) {
        return http.post("/subscribers", data);
    }
    update(id, data) {
        return http.put(`/subscribers/${id}`, data);
    }
    delete(id) {
        return http.delete(`/subscribers/${id}`);
    }
    findByTitle(firstName) {
        return http.get(`/subscribers?firstName=${firstName}`);
    }
}

export default new SubscribeDataService();
