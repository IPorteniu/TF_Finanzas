import http from "../http-common";

class CreditsDataService {
    getAll() {
        return http.get("/credits");
    }

    get(id) {
        return http.get(`/credits/${id}`);
    }

    create(data) {
        return http.post("/credits", data);
    }

    update(id, data) {
        return http.put(`/credits/${id}`, data);
    }

    delete(id) {
        return http.delete(`/credits/${id}`);
    }

}

export default new CreditsDataService();
