import http from "../http-common";

// TODO Verificar si es necesario crear un SetStatus para los invoices
class StatusDataService {
    getAll() {
        return http.get("/status");
    }

    get(id) {
        return http.get(`/status/${id}`);
    }

    create(data) {
        return http.post("/status", data);
    }

    update(id, data) {
        return http.put(`/status/${id}`, data);
    }

    delete(id) {
        return http.delete(`/status/${id}`);
    }
}

export default new StatusDataService();
