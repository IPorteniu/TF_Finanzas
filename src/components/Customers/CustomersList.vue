<template>
  <div>
    <p>holi</p>
  </div>
</template>

<script>
// TODO Agregar atributos que se quieran mostrar como vista previa de la lista de clientes

import CustomersDataService from "@/services/CustomersDataService";
export default {
  name: "CustomersList",
  data() {
    return {
      customers: [],
      currentCustomer: null,
      currentIndex: -1
    };
  },
  methods:{
    retrieveCustomers(){
      CustomersDataService.getAll()
          .then(response => {
            this.customers = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
    refreshList(){
      this.retrieveCustomers();
      this.currentCustomer = null;
      this.currentIndex = -1;
    },
    searchByOwner(){
      CustomersDataService.findByOwnerId(this.ownerId)
          .then(response => {
            this.customers = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    }
  },
  mounted() {
    this.retrieveCustomers();
  }
}
</script>

<style scoped>

</style>