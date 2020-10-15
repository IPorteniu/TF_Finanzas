import http from "@/http-common";

class TermsDataService {
    getAll() {
        return http.get("/terms");
    }

    get(id) {
        return http.get(`/terms/${id}`);
    }

    create(data) {
        return http.post("/terms", data);
    }

    update(id, data) {
        return http.put(`/terms/${id}`, data);
    }

    delete(id) {
        return http.delete(`/terms/${id}`);
    }

}

export default new TermsDataService();
