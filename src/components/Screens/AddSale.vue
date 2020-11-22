<template>
  <div class="list row shadow">
    <!-- Search Panel -->
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          id = "search_text"
          placeholder="Producto"
          v-model="name"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            id = "search"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <!-- Tutorials List Panel -->
    <div class="col-md-6">
      <h4>Product List</h4>
      <ul class="list-group">
        <li
          style="background-color: #ffa504"
          class="list-group-item"
          :class="{ active: index === currentIndex }"
          v-for="(tutorial, index) in tutorials"
          :key="index"
          @click="setActiveTutorial(tutorial, index)"
        >
          {{ tutorial.name }}
        </li>
      </ul>
    </div>
    <!-- Current Tutorial Panel -->
    <div class="col-md-6">
      <div v-if="currentTutorial">
        <h4>Product Info</h4>
        <div>
          <label><strong>Name: </strong>{{ currentTutorial.name }}</label>
        </div>
        <div>
          <label><strong>Precio: </strong>{{ currentTutorial.price }}</label>
        </div>
      </div>
      <div v-else>
        <br />
        <p>Haz click en un producto para agregarlo a la compra del cliente.</p>
      </div>
      <div>
        <div v-if="currentCustomer">
          <label
            ><strong>Cliente: </strong>{{ currentCustomer.first_name }}</label
          >
        </div>
        <div v-if="currentOrder">
          <label><strong>Order: </strong>{{ currentOrder.id }}</label>
        </div>
        <div v-if="currentOrder">
          <label
            ><strong>Total a pagar por la orden: </strong
            >{{ currentOrder.total_price }}</label
          >
        </div>
        <div v-if="currentInvoice">
          <label
            ><strong>Total cargado a la cuenta hasta la fecha: </strong
            >{{ currentInvoice.charges }}</label
          >
          <strong><p>Cantidad: </p></strong>
          <input
            type="number"
            class="form-control"
            id="quantity"
            v-model="quantity"
          />
        </div>
        <button
          v-if="currentOrder"
          class="badge badge-success differX"
          @click="AddOrder_Detail"
        >
          Añadir a la orden
        </button>
      </div>
      <button
          v-if="currentOrder"
          class="badge badge-success"
          @click="GetOrderDetail"
        >
          Finalizar
        </button>
    </div>
  </div>
</template>

<script>
import ProductDataService from "@/services/ProductsDataService";
import CustomerDataService from "@/services/CustomersDataService";
import OrderDataService from "@/services/OrdersDataService";
import InvoiceDataService from "@/services/InvoicesDataService";
import OrderDetailDataService from "@/services/OrderDetailsDataService";
import CreditDataService from "@/services/CreditsDataService";

export default {
  name: "ProductList",
  data() {
    return {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,

      name: "",

      currentOrder: {
        id: null,
        invoice_id: "",
        date: "",
        total_price: 0,
      },

      currentInvoice: {
        id: null,
        credit_id: "",
        status_id: "",
        charges: "",
        start_date: "",
        end_date: "",
      },

      currentCustomer: {
        id: null,
        owner_id: "",
        email: "",
        phone: "",
        first_name: "",
        last_name: "",
        address: "",
        password: "",
      },

      order_detail: {
        product_id: null,
        order_id: null,
        quantity: 0,
        price_detail: 0,
      },

      credit: {
        id: null,
        customer_id: "",
        currency_id: "",
        active: "",
        amount: "",
        created_in: "",
        arrears: "",
      },

      quantity: "",
    };
  },
  methods: {
    retrieveTutorials() {
      ProductDataService.getAll()
        .then((response) => {
          this.tutorials = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveTutorials();
      this.currentTutorial = null;
      this.currentIndex = -1;
    },
    setActiveTutorial(tutorial, index) {
      this.quantity = "";
      document.getElementById('quantity').readOnly = false;
      this.currentTutorial = tutorial;
      this.currentIndex = index;
      console.log(this.currentTutorial.name);
      console.log(this.currentIndex);
      if(this.currentIndex == 3){
        this.quantity = 1;
        document.getElementById('quantity').readOnly = true;
      }
    },
    searchTitle() {
      ProductDataService.findByNombre(this.name)
        .then((response) => {
          this.tutorials = response.data;
          console.log(response.data);
          if(this.tutorials.length == 0){
            this.refreshList();
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getCustomer(id) {
      CustomerDataService.get(id)
        .then((response) => {
          this.currentCustomer = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getOrder(order_id) {
      OrderDataService.get(order_id)
        .then((response) => {
          this.currentOrder = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getInvoice(invoice_id) {
      InvoiceDataService.get(invoice_id)
        .then((response) => {
          this.currentInvoice = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getCredit(customer_id) {
      CreditDataService.findByCustomerId(customer_id)
        .then((response) => {
          this.credit = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    AddOrder_Detail() {
      console.log(this.currentOrder.id);
      console.log(this.currentTutorial.id);
      console.log(this.currentOrder.total_price);

      console.log(this.quantity);
      console.log(this.quantity * this.currentTutorial.price);
      var i;
      var monto = 0;
      for (i = 0; i < this.tutorials.length; i++) {
        console.log(this.tutorials[i].price);
        monto = monto + parseFloat(this.tutorials[i].price * this.quantity);
      }
      console.log(monto);

      const data = {
        product_id: parseInt(this.currentTutorial.id),
        order_id: parseInt(this.$route.params.order_id),
        quantity: parseInt(this.quantity),
        price_detail: parseInt(this.quantity * this.currentTutorial.price),
      };
      console.log(data);

      console.log(this.currentOrder);
      this.currentOrder.total_price =
        this.currentOrder.total_price +
        this.quantity * this.currentTutorial.price;
      console.log(this.currentOrder.total_price);

      this.currentInvoice.charges =
        this.currentInvoice.charges +
        this.quantity * this.currentTutorial.price;
      this.currentInvoice.charges = Number(Math.round(this.currentInvoice.charges+'e2')+'e-2');
      
      console.log(this.credit[0].amount)
      if(this.currentInvoice.charges < this.credit[0].amount){
        OrderDetailDataService.create(data)
        .then((response) => {
          this.order_detail.id = response.data.id;
          console.log(response.data);
          this.submited = true;
        })
        .catch((e) => {
          console.log(e);
        });  

        InvoiceDataService.update(this.currentInvoice.id, this.currentInvoice)
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });

      OrderDataService.update(this.currentOrder.id, this.currentOrder)
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
      } else {
        document.location.href = `/owner/my_customers/${this.currentCustomer.owner_id}`;
        alert("La última venta no se registró, monto excede el crédito del cliente")
      }

      this.quantity = "";
    },
    GetOrderDetail(){
        document.location.href = `/order-detail/${this.currentOrder.id}/owner-view/${this.currentCustomer.owner_id}`;
    },
  },
  mounted() {
    this.retrieveTutorials();
    this.getCustomer(this.$route.params.id);
    this.getOrder(this.$route.params.order_id);
    this.getInvoice(this.$route.params.invoice_id);
    this.getCredit(this.$route.params.id);
    var input = document.getElementById("search_text");
            input.addEventListener("keyup", function(event) {
            // Number 13 is the "Enter" key on the keyboard
            if (event.keyCode === 13) {
              // Cancel the default action, if needed
              event.preventDefault();
              // Trigger the button element with a click
              document.getElementById("search").click();
            }
          });
  },
};
</script>

<style scoped>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
.differ {
  margin: 30px;
}
.shadow {
    -webkit-box-shadow: 0 8px 6px -6px #999;
    -moz-box-shadow: 0 8px 6px -6px #999;
    box-shadow: 0 20px 6px -6px #999;
    z-index: 10;
    height: 600px;
    width: 700px;
    background-color: rgb(255, 255, 255);
    margin-top: 30px;
    margin-left: 300px;

    padding: 10px;
}
.differX{
  margin-top: 20px;
}
</style>