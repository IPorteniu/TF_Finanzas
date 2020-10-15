import http from "@/http-common";

class CustomersDataService {
    getAll() {
        return http.get("/customers");
    }

    get(id) {
        return http.get(`/customers/${id}`);
    }

    create(data) {
        return http.post("/customers", data);
    }

    update(id, data) {
        return http.put(`/customers/${id}`, data);
    }

    delete(id) {
        return http.delete(`/customers/${id}`);
    }
    findByOwnerId(owner_id) {
        return http.get(`/customers?owner_id=${owner_id}`);
    }
}

export default new CustomersDataService();
