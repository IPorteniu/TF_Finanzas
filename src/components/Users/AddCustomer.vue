<template>
  <div>
    <p>holi</p>
    <button @click="saveCustomer" class="btn btn-success">Submit</button>
  </div>
</template>

<script>
import CustomerDataService from "@/services/CustomersDataService";
export default {
    name: "AddCustomer",
    data() {
        return{
            customer: {
                id: null,
                ownerId: null,
                email: "",
                firstName: "",
                lastName:"",
                phone: "",
                address: "",
                password: ""
            }
        };
    },
    // TODO verificar que la relacion entre owner y customer funcione
    methods: {
        saveCustomer(){
            const data = {
                email: this.customer.email,
                firstName: this.customer.firstName,
                lastName: this.customer.lastName,
                phone: this.customer.phone,
                address: this.customer.address,
                password: this.customer.password
            };

            CustomerDataService.create(data)
            .then(response => {
                this.customer.id = response.data.id;
                this.customer.ownerId = response.data.ownerId;
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })
        },
        newCustomer() {
            this.customer = {};
        }
    }
}
</script>

<style>

</style>
