import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        { path: "/", alias: "/subscribers", name: "subscribers", component: () => import("./components/SubscribersList") },
        { path: "/subscribers/:id", name: "subscriber-details", component: () => import("./components/Subscriber") },
        { path: "/", alias: "/customers", name: "customers", component: () => import("./components/Customers/CustomersList") },
        { path: "/customers/:id", name: "customer-details", component: () => import("./components/Customers/Customer") },
        { path: "/register1", name: "register", component: () => import("./components/Customers/AddCustomer")},
        { path: "/register", name: "register", component: () => import("./components/AddSubscriber")}
    ] 
});
