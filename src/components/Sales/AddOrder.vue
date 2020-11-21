<template>
   <div class="submit-form shadow differDIV">
   <div class="differ">
   <h2>REGISTRAR VENTA</h2>
      <div v-if="!submitted">
         <div class="form-group">
            <label for="InvoiceId">Invoice-ID</label>
            <input id="InvoiceId" v-model="order.invoice_id " class="form-control" name="InvoiceId" required
                   type="text"/>
         </div>
         <div class="form-group">
            <label for="Date">Date</label>
            <input id="Date" v-model="order.date " class="form-control" name="Date" required
                   type="date"/>
         </div>
         <button class="btn btn-success" @click="saveOrder">Submit</button>
      </div>
      <div v-else>
         <h4>Successfully submitted.</h4>
         <button class="btn btn-success" @click="newOrder">Add</button>
      </div>
   </div>
   </div>
   <!-- TODO / Lista para elegir las invoices disponibles-->
</template>

<script>
import OrdersDataService from "@/services/OrdersDataService";

export default {
   name: "AddOrder",
   data() {
      return {
         order: {
            id: null,
            invoice_id: null,
            date: null
         },
         submitted: false
      }
   },
   methods: {
      saveOrder() {
         const data = {
            invoiceId: Number(this.order.invoice_id),
            date: this.order.date
         };
         OrdersDataService.create(data)
             .then(response => {
                this.order.id = response.data.id;
                console.log(response.data());
                this.submitted = true;
             })
            .catch(e => {
               console.log(e);
            });
      },
      newOrder(){
         this.submitted = false;
         this.order= {};
      }
   }
}
</script>

<style scoped>

.shadow {
    -webkit-box-shadow: 0 8px 6px -6px #999;
    -moz-box-shadow: 0 8px 6px -6px #999;
    box-shadow: 0 20px 6px -6px #999;
    z-index: 1000;
    height: 500px;
    width: 400px;
    background-color: rgb(255, 255, 255);
    margin-top: 50px;
}

.differ {
   padding: 20px;
}

.differDIV {
   margin-left: 60px;
}

</style>