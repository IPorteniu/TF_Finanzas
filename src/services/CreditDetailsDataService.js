import http from "../http-common";

class CreditDetailsDataService {
    getAll() {
        return http.get("/credit_details");
    }

    get(id) {
        return http.get(`/credit_details/${id}`);
    }

    create(data) {
        return http.post("/credit_details", data);
    }

    update(id, data) {
        return http.put(`/credit_details/${id}`, data);
    }

    delete(id) {
        return http.delete(`/credit_details/${id}`);
    }

    findByCreditId(credit_id) {
        return http.get(`/credit_details?credit_id=${credit_id}`);
    }
}

export default new CreditDetailsDataService();
