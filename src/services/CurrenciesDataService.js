import http from "../http-common";

class CurrenciesDataService {
    getAll() {
        return http.get("/currencies");
    }

    get(id) {
        return http.get(`/currencies/${id}`);
    }

    create(data) {
        return http.post("/currencies", data);
    }

    update(id, data) {
        return http.put(`/currencies/${id}`, data);
    }

    delete(id) {
        return http.delete(`/currencies/${id}`);
    }

}

export default new CurrenciesDataService();