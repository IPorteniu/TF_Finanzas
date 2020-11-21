import http from "@/http-common";

class OrderDetailsDataService {
    getAll() {
        return http.get("/order_details");
    }

    get(id) {
        return http.get(`/order_details/${id}`);
    }

    create(data) {
        return http.post("/order_details", data);
    }

    update(id, data) {
        return http.put(`/order_details/${id}`, data);
    }

    delete(id) {
        return http.delete(`/order_details/${id}`);
    }
    findByOrderId(order_id) {
        return http.get(`/order_details?order_id=${order_id}`);
    }

}

export default new OrderDetailsDataService();
