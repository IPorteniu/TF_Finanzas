import http from "@/http-common";

class RatesDataService {
    getAll() {
        return http.get("/rates");
    }

    get(id) {
        return http.get(`/rates/${id}`);
    }

    create(data) {
        return http.post("/rates", data);
    }

    update(id, data) {
        return http.put(`/rates/${id}`, data);
    }

    delete(id) {
        return http.delete(`/rates/${id}`);
    }

}

export default new RatesDataService();
