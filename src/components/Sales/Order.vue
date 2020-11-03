<template>
   <!-- Current Order is available -->
   <div v-if="currentOrder" class="edit-form">
      <h4>Order</h4>
      <form>
         <div class="form-group">
            <label for="id">OrderID </label>
            <input type="text" class="form-control" id="id" v-model="currentOrder.id"/>
         </div>
         <div class="form-group">
            <label for="date">Date </label>
            <input type="date" class="form-control" id="date" v-model="currentOrder.date" />
         </div>
         <!-- TODO Colocar una lista de las invoices que estan actualmente activas para asignarle una(?-->
         <div class="form-group">
            <label for="invoiceId">Invoice Number </label>
            <input type="text" class="form-control" id="invoiceId" v-model="currentOrder.invoiceId"/>
         </div>
      </form>
      <button class="badge badge-danger mr-2" @click="deleteOrder">Delete Order</button>
      <button class="badge badge-success" @click="updateOrder">Update</button>
      <p>{{ message }}</p>
   </div>
   <!-- Current Order unavailable -->
   <div v-else>
      <br/>
      <p>Please click on a Order</p>
   </div>
</template>

<script>
import OrdersDataService from "@/services/OrdersDataService";

export default {
   name: "Order",
   data() {
      return {
         currentOrder: null,
         message: ''
      };
   },
   methods: {
      getOrder(id) {
         OrdersDataService.get(id)
             .then(response => {
                this.currentOrder = response.data;
                console.log(response.data());
             })
             .catch(e => {
                console.log(e);
             });
      },
      updatePublished() {
         const data = {
            id: this.currentOrder.id,
            invoiceId: this.currentOrder.invoiceId,
            date: this.currentOrder.date
         };
         OrdersDataService.update(this.currentOrder.id, data)
             .then(response => {
                console.log(response.data);
             })
             .catch(e => {
                console.log(e);
             });
      },
      updateOrder() {
         OrdersDataService.update(this.currentOrder.id, this.currentOrder)
             .then(response => {
                console.log(response.data);
                this.message = 'Order successfully updated.';
             })
             .catch(e => {
                console.log(e);
             })
      },
      deleteOrder() {
         OrdersDataService.delete(this.currentOrder.id)
             .then(response => {
                console.log(response.data);
                this.$router.push({name: "orders"});
             })
             .catch(e => {
                console.log(e);
             });
      }
   },
   mounted() {
      this.message = '';
      this.getOrder(this.$route.params.id);
   }
}
</script>

<style scoped>

</style>