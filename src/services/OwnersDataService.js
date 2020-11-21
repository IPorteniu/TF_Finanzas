import http from "@/http-common";

class OwnersDataService {
    getAll() {
        return http.get("/owners");
    }

    get(id) {
        return http.get(`/owners/${id}`);
    }

    create(data) {
        return http.post("/owners", data);
    }

    update(id, data) {
        return http.put(`/owners/${id}`, data);
    }

    delete(id) {
        return http.delete(`/owners/${id}`);
    }

    findByRuc(ruc) {
        return http.get(`/owners?ruc=${ruc}`);
    }
}

export default new OwnersDataService();
