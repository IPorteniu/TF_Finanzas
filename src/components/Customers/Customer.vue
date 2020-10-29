<template>
  <div>
    <p>holi</p>
  </div>
</template>

<script>
import CustomerDataService from "@/services/CustomersDataService";
export default {
    name: "Customer",
    data() {
        return{
            currentCustomer: null
        };
    },
    methods: {
        getCustomer(id) {
            CustomerDataService.getCustomer(id)
            .then(response =>{
                this.currentCustomer = response.data;
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        },
    },
    mounted(){
            this.getCustomer(this.$route.params.id);
        }
};
</script>

<style>

</style>