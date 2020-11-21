<template>
   <div class="list row">
   <div class="col-md-6">
      <h4>Product List</h4>
      <ul class="list-group">
         <li style="background-color: #ffa504" class="list-group-item" :class="{ active: index === currentIndex }"
             v-for="(product, index) in products" :key="index"
             @click="setActiveProduct(product, index)">{{ product.name}}
         </li>
      </ul>
   </div>
   <!-- Current Product Panel -->
   <div class="col-md-6">
      <div v-if="currentProduct">
         <h4>Recruit Info</h4>
         <div>
            <label><strong>Name: </strong>{{ currentProduct.name}}</label>
         </div>
         <div>
            <label><strong>Price: </strong>{{ currentProduct.price }}</label>
         </div>
         <div>
            <label><strong>Product ID: </strong>{{ currentProduct.id }}</label>
         </div>
         <a class="badge badge-warning" style="background-color: lightblue" :href="'/products/'+currentProduct.id">Edit</a>
      </div>
      <div v-else>
         <br/>
         <p>Please click on a Product.</p>
      </div>
   </div>
   </div>
</template>

<script>
import ProductsDataService from "@/services/ProductsDataService";

export default {
   name: "ProductsList",
   data() {
      return {
         products: [],
         currentProduct: null,
         currentIndex: -1,
         name: "",
         price: null
      };
   },
   methods: {
      retrieveProducts() {
         ProductsDataService.getAll()
             .then(response => {
                this.products = response.data;
                console.log(response.data)
             })
             .catch(e => {
                console.log(e)
             });
      },
      refreshList() {
         this.retrieveProducts();
         this.currentTutorial = null;
         this.currentIndex = -1;
      },
      setActiveProduct(product, index){
         this.currentProduct = product;
         this.currentIndex = index;
      }
   },
   mounted() {
      this.retrieveProducts();
   }

}
</script>
<style scoped>

</style>