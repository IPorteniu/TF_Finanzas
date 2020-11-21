import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        { path: "/", alias: "/main", name: "Caja Neydita", component: () => import("./components/Screens/Main") },
        { path: "/customer", alias: "/main", name: "Caja Neydita", component: () => import("./components/Screens/logins/LoginCustomer") },
        { path: "/owner", alias: "/main", name: "Caja Neydita", component: () => import("./components/Screens/logins/LoginOwner") },
        
        { path: "/owner/my_customers/:id", name: "customer-list", component: () => import("./components/Screens/CustomerList") },
        
        { path: "/add-credit/:id", name: "add-credit", component: () => import("./components/Screens/AddCredit") },
        { path: "/add-credit/:id/:credit_id", name: "add-credit-detail", component: () => import("./components/Screens/AddCredit-detail") },

        { path: "/add-sale/customer/:id/invoice/:invoice_id/order/:order_id", name: "register-sale", component: () => import("./components/Screens/AddSale") },
        { path: "/order-detail/:order_id/owner-view/:owner_id", name: "order-detail", component: () => import("./components/Screens/OrderDetail") },
        { path: "/order-detail/:order_id/view/:customer_id", name: "order-detail", component: () => import("./components/Screens/OrderDetail") },

        { path: "/add-customer/:id", name: "register-customer", component: () => import("./components/Screens/AddCustomer") },
        { path: "/customer-profile/:id", name: "customer-profile", component: () => import("./components/Screens/ViewCustomer") },
        { path: "/customer-profile/:customer_id/credit/:credit_id/detail/:detail_id/invoice/:invoice_id", name: "customer-profile-detail", component: () => import("./components/Screens/ViewCustomerCredit") },
        { path: "/credit-payment/customer/:customer_id/credit/:credit_id/detail/:detail_id/invoice/:invoice_id", name: "customer-pay", component: () => import("./components/Screens/PagarDeuda") },



        //OTHER ROUTES
        // Customers routes
        { path: "/", alias: "/customers", name: "customers", component: () => import("./components/Users/CustomersList") },
        { path: "/customers/:id", name: "customer-details", component: () => import("./components/Users/Customer") },
        { path: "/register1", name: "register", component: () => import("./components/Users/AddCustomer")},
        // Products routes
        { path: "/add-products", name:"register-product", component: () => import("./components/Sales/AddProduct")},
        { path: "/products", name:"products-list", component: () => import("./components/Sales/ProductsList")},
        { path: "/products/:id", name: "product-details", component: () => import("./components/Sales/Product") },
        // Orders routes
        { path: "/add-orders", name: "register-order", component: () => import("./components/Sales/AddOrder") },
        { path: "/orders", name: "orders-list", component: () => import("./components/Sales/OrdersList") },
        { path: "/orders/:id", name: "specific-order", component: () => import("./components/Sales/Order") },

        { path: "/subscribers/:id", name: "subscriber-details", component: () => import("./components/Subscriber") },
        { path: "/register", name: "registerS", component: () => import("./components/AddSubscriber")},
        //Terms and conditions
        { path: "/terms&conditions", name: "t&c", component: () => import("./components/TermsAndConditions")}

    ]
});
