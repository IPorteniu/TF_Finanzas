import http from "../http-common";
// TODO Es necesario usar set currency ID? (emoji que se pregunta)
class ProductsDataService {
    getAll() {
        return http.get("/products");
    }

    get(id) {
        return http.get(`/products/${id}`);
    }

    create(data) {
        return http.post("/products", data);
    }

    update(id, data) {
        return http.put(`/products/${id}`, data);
    }

    delete(id) {
        return http.delete(`/products/${id}`);
    }

    findByNombre(name) {
        return http.get(`/products?name=${name}`);
    }
}

export default new ProductsDataService  ();