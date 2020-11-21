<template>
   <div class="submit-form shadow differDIV">
      <div class="differ">
         <h2>REGISTRAR PRODUCTO</h2>
         <div v-if="!submitted">
            <div class="form-group">
               <label for="name">Nombre</label>
               <input id="name" v-model="product.name" class="form-control" name="name" required
                        type="text"/>
            </div>
            <div class="form-group">
               <label for="price">Precio</label>
               <input id="price" v-model="product.price " class="form-control" name="price" required
                        type="text"/>
            </div>
            <div class="form-group">
               <label for="currency_id">Moneda 0-1</label>
               <input id="currency_id" v-model="product.currency_id " class="form-control" name="currency_id" required
                        type="text"/>
            </div>
            <button class="btn btn-success" @click="saveProduct">Submit</button>
         </div>
         <div v-else>
            <h4>Successfully submitted.</h4>
            <button class="btn btn-success" @click="newProduct">Add</button>
         </div>
      </div>
   </div>
   <!-- TODO / Casilla para marcar entre dolares o soles para elegir la moneda -->
</template>

<script>
import ProductsDataService from "@/services/ProductsDataService";

export default {
   name: "AddProduct",
   data() {
      return {
         product: {
            id: null,
            currency_id: null,
            price: null,
            name: ""
         },
         submitted: false
      };
   },
   methods: {
      saveProduct() {
         const data = {
            name: this.product.name,
            price: Number(this.product.price),
            currencyId: Number(this.product.currency_id)
         };

         ProductsDataService.create(data)
             .then(response => {
                this.product.id = response.data.id;
                console.log(response.data);
                this.submitted = true;
             })
             .catch(e => {
                console.log(e);
             });
      },
      newProduct() {
         this.submitted = false;
         this.product = {};
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