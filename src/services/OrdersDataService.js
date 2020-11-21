import http from "@/http-common";

class OrdersDataService {
    getAll() {
        return http.get("/orders");
    }

    get(id) {
        return http.get(`/orders/${id}`);
    }

    create(data) {
        return http.post("/orders", data);
    }

    update(id, data) {
        return http.put(`/orders/${id}`, data);
    }

    delete(id) {
        return http.delete(`/orders/${id}`);
    }

    findByInvoiceId(invoice_id) {
        return http.get(`/orders?invoice_id=${invoice_id}`);
    }
}

export default new OrdersDataService();