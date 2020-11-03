<template>
   <div class="list row">
      <div class="col-md-6">
         <h4>Order List</h4>
         <ul class="list-group">
            <li style="background-color: #ffa504" class="list-group-item" :class="{ active: index === currentIndex }"
                v-for="(order, index) in orders" :key="index"
                @click="setActiveOrder(order, index)">{{ order.id}}
            </li>
         </ul>
      </div>
      <!-- Current Product Panel -->
      <div class="col-md-6">
         <div v-if="currentOrder">
            <h4>Recruit Info</h4>
            <div>
               <label><strong>Id: </strong>{{ currentOrder.id}}</label>
            </div>
            <div>
               <label><strong>Date: </strong>{{ currentOrder.date }}</label>
            </div>
            <a class="badge badge-warning" style="background-color: lightblue" :href="'/orders/'+currentOrder.id">Edit</a>
         </div>
         <div v-else>
            <br/>
            <p>Please click on a Order.</p>
         </div>
      </div>
   </div>
</template>

<script>
import OrdersDataService from "@/services/OrdersDataService";

export default {
   name: "OrdersList",
   data() {
      return {
         orders: [],
         currentOrder: null,
         currentIndex: -1,
         id: null,
         invoiceId: null
      };
   },
   methods: {
      retrieveOrders() {
         OrdersDataService.getAll()
         .then(response => {
            this.orders = response.data;
            console.log(response.data);
         })
         .catch(e => {
            console.log(e);
         });
      },
      refreshList() {
         this.retrieveOrders();
         this.currentOrder = null;
         this.currentIndex = -1;
      },
      setActiveOrder(order,index){
         this.currentOrder = order;
         this.currentIndex = index;
      }
   },
   mounted() {
      this.retrieveOrders();
   }
}
</script>

<style scoped>

</style>