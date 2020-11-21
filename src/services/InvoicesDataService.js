import http from "@/http-common";

class InvoicesDataService {
    getAll() {
        return http.get("/invoices");
    }

    get(id) {
        return http.get(`/invoices/${id}`);
    }

    create(data) {
        return http.post("/invoices", data);
    }

    update(id, data) {
        return http.put(`/invoices/${id}`, data);
    }

    delete(id) {
        return http.delete(`/invoices/${id}`);
    }
    
    findByCreditId(credit_id) {
        return http.get(`/invoices?credit_id=${credit_id}`);
    }

}

export default new InvoicesDataService();