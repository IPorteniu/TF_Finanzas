<template>
   <!-- Current Product is available -->
   <div v-if="currentProduct" class="edit-form">
      <h4>Product</h4>
      <form>
         <div class="form-group">
            <label for="name">Name </label>
            <input type="text" class="form-control" id="name" v-model="currentProduct.name"/>
         </div>
         <div class="form-group">
            <label for="price">price </label>
            <input type="text" class="form-control" id="price" v-model="currentProduct.price"/>
         </div>
      </form>
      <button class="badge badge-danger mr-2" @click="deleteProduct">Delete Product</button>
      <button class="badge badge-success" @click="updateProduct">Update</button>
      <p>{{ message }}</p>
   </div>
   <!-- Current Tutorial unavailable -->
   <div v-else>
      <br/>
      <p>Please click on a Product</p>
   </div>
</template>

<script>
import ProductsDataService from "@/services/ProductsDataService";

export default {
   name: "Product",
   data() {
      return {
         currentProduct: null,
         message: ''
      };
   },
   methods: {
      getProduct(id) {
         ProductsDataService.get(id)
             .then(response => {
                this.currentProduct = response.data;
                console.log(response.data);
             })
             .catch(e => {
                console.log(e);
             });
      },
      updatePublished(){
         const data = {
            name: this.currentProduct.name,
            price: this.currentProduct.price,
            currencyId: this.currentProduct.currencyId
         };
         ProductsDataService.update(this.currentProduct.id,data)
            .then(response => {
               console.log(response.data);
            })
            .catch(e => {
               console.log(e);
            });
      },
      updateProduct() {
         ProductsDataService.update(this.currentProduct.id, this.currentProduct)
             .then(response => {
                console.log(response.data);
                this.message = 'Product successfully updated.';
             })
             .catch(e => {
                console.log(e);
             })
      },
      deleteProduct() {
         ProductsDataService.delete(this.currentProduct.id)
             .then(response => {
                console.log(response.data);
                // Redirect to Product List
                this.$router.push({name: "products"});
             })
             .catch(e => {
                console.log(e);
             });
      }
   },
   mounted() {
      this.message = '';
      this.getProduct(this.$route.params.id);
   }
};
</script>

<style scoped>

</style>