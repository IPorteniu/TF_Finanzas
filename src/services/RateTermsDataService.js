import http from "@/http-common";

class RateTermsDataService {
    getAll() {
        return http.get("/rate_terms");
    }

    get(id) {
        return http.get(`/rate_terms/${id}`);
    }

    create(data) {
        return http.post("/rate_terms", data);
    }

    update(id, data) {
        return http.put(`/rate_terms/${id}`, data);
    }

    delete(id) {
        return http.delete(`/rate_terms/${id}`);
    }

}

export default new RateTermsDataService();
