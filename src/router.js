import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        { path: "/", alias: "/subscribers", name: "subscribers", component: () => import("./components/SubscribersList") },
        { path: "/subscribers/:id", name: "subscriber-details", component: () => import("./components/Subscriber") },
        { path: "/register", name: "register", component: () => import("./components/AddSubscriber")}
    ]
});
