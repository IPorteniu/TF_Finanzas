import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        { path: "/", alias: "/subscribers", name: "subscribers", component: () => import("./components/SubscribersList") },
        { path: "/subscribers/:id", name: "subscriber-details", component: () => import("./components/Subscriber") },
        { path: "/", alias: "/customers", name: "customers", component: () => import("./components/Users/CustomersList") },
        { path: "/customers/:id", name: "customer-details", component: () => import("./components/Users/Customer") },
        { path: "/register1", name: "register", component: () => import("./components/Users/AddCustomer")},
        { path: "/register", name: "register", component: () => import("./components/AddSubscriber")},
        { path: "/add-products", name:"register-product", component: () => import("./components/Sales/AddProduct")}
    ] 
});
