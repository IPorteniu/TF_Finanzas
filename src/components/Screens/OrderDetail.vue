<template>
<div class="shadow">
  <div class="col-md-12">
    <h4>Detalle de la orden {{order.id}}</h4>
    <div class="container">
      <div class="row">
        <div class="col-sm-4 col-md-4 col-lg-4">
          <p>Nombre del producto:</p>
          <ul class="list-group">
            <li
              style="background-color: #ffa504"
              class="list-group-item"
              :class="{ active: index === currentIndex }"
              v-for="(product, index) in products"
              :key="index"
            >
              {{ product.name }}              
            </li>
          </ul>
        </div>
        <div class="col-sm-3 col-md-3 col-lg-3">
          <p>Precio Unitario:</p>
          <ul class="list-group">
            <li
              style="background-color: #ffa504"
              class="list-group-item"
              :class="{ active: index === currentIndex }"
              v-for="(product, index) in products"
              :key="index"
            >
              {{ product.price }}
            </li>
          </ul>
        </div>
        <div class="col-sm-3 col-md-3 col-lg-3">
          <p>Cantidad:</p>
          <ul class="list-group">
            <li
              style="background-color: #ffa504"
              class="list-group-item"
              :class="{ active: index === currentIndex }"
              v-for="(detail, index) in details"
              :key="index"
            >
              {{ detail.quantity }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="differ">
        <label><strong>Precio total de la orden: </strong>{{ order.total_price }}</label>
    </div>
    <div>
        <label><strong>Fecha de la compra: </strong>{{ order.date }}</label>
    </div>
    <div>
        <button
          v-if="order"
          class="badge badge-success"
          @click="confirm"
        >
          Finalizar
        </button>
  </div>
     <div>
        <button class="badge badge-success differB" @click="printPage">
           Imprimir reporte
        </button>
     </div>
     </div>
</div>
</template>
<script>
import ProductDataService from "@/services/ProductsDataService";
import OrderDataService from "@/services/OrdersDataService";
import OrderDetailDataService from "@/services/OrderDetailsDataService";

export default {
  name: "OrderDetail",
  data() {
    return {
      order: {
        id: null,
        invoice_id: "",
        date: "",
        total_price: "",
      },

      product: {
        id: null,
        currency_id: "",
        price: "",
        name: "",
      },

      order_detail: {
        id: null,
        product_id: "",
        order_id: "",
        quantity: "",
        price_detail: "",
      },

      products: [],
      currentProduct: null,
      currentIndex: -1,

      details: [],
    };
  },
  methods: {
    getOrder(order_id) {
      OrderDataService.get(order_id)
        .then((response) => {
          this.order = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
     printPage(){
        window.print();
     },
    retrieveDetails(order) {
      OrderDetailDataService.findByOrderId(order)
        .then((response) => {
          this.details = response.data;
          console.log(response.data);
          var i;
          for (i = 0; i < this.details.length; i++) {
            console.log(this.details[i].product_id);
            ProductDataService.get(this.details[i].product_id)
              .then((response) => {
                this.products.push(response.data);
                console.log(response.data);
              })
              .catch((e) => {
                console.log(e);
              });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    confirm(){
        if(this.$route.params.owner_id){
        document.location.href = `/owner/my_customers/${this.$route.params.owner_id}`;
        } else{
        window.history.back();
        }
    },
  },
  mounted() {
    this.getOrder(this.$route.params.order_id);
    this.retrieveDetails(this.$route.params.order_id);
    console.log(this.$route)
  },
};
</script>
<style scoped>
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
.differ{
  margin-top:40px;
}
</style>