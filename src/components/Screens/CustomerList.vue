<template>
    <div class="list row">
        <!-- Search Panel -->
        <!-- <div class="col-md-8">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="firstName" v-model="owner_id"/>
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click="searchTitle">Search</button>
                </div>
            </div>
        </div> -->
        <!-- Tutorials List Panel -->
        <div class="col-md-6">
            <h4>My Customers</h4>
            <ul class="list-group">
                <li style="background-color: #ffa504" class="list-group-item" :class="{ active: index === currentIndex }"
                    v-for="(tutorial, index) in tutorials" :key="index"
                    @click="setActiveTutorial(tutorial, index)">{{tutorial.first_name}}
                </li>
            </ul>
        </div>
        <!-- Current Tutorial Panel -->
        <div class="col-md-6">
            <div v-if="currentTutorial">
                <h4>Customer Info</h4>
                <div>
                    <label><strong>Name:</strong>{{ currentTutorial.first_name + " " + currentTutorial.last_name}}</label>
                </div>
                <div>
                    <label><strong>Email:</strong>{{ currentTutorial.email }}</label>
                </div>
                <div>
                    <label><strong>Owner ID:</strong>{{ currentTutorial.owner_id }}</label>
                </div>   
                <div v-if="currentCredit">
                    <label><strong>Credit amount:</strong>{{ currentCredit.amount }}</label>
                </div> 
                <div v-if="currentCredit">
                    <label><strong>Credit created_in:</strong>{{ currentCredit.created_in }}</label>
                </div>            
                <a v-if="currentCredit == ''" class="badge badge-warning" style="background-color: lightblue" :href="'/add-credit/'+currentTutorial.id">Definir Crédito</a>
                <a v-if="currentCredit" class="badge badge-warning" style="background-color: white" :href="'/add-sale/'+currentTutorial.id">Agregar una venta</a>
            </div>
            <div v-else>
                <br/>
                <p>Please click on a Subscriber.</p>
            </div>
        </div>
        <a class="badge badge-warning differ" style="background-color: white" :href="'/add-customer/'+this.owner_id">Agregar Cliente</a>
    </div>
</template>

<script>
    import CustomerDataService from "@/services/CustomersDataService";
    import CreditDataService from "@/services/CreditsDataService";

    export default {
        name: "CustomerList",
        data() {
            return {
                tutorials: [],
                currentTutorial: null,
                currentIndex: -1,
                
                owner_id: "",
                email: "",
                phone: "", 
                first_name: "",
                last_name: "",
                address:"",
                password:"",

                credits: [],
                currentCredit: "",
                customer_id: "", 
            };
        },
        methods: {
            retrieveTutorials() {
                CustomerDataService.getAll()
                .then(response => {
                    this.tutorials = response.data;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
            },
            retrieveCredits() {
                CreditDataService.getAll()
                .then(response => {
                    this.credits = response.data;
                    console.log(response.data);
                    var i;
                    for (i = 0; i < this.credits.length; i++){
                        if(this.credits[i]["customer_id"] == this.currentTutorial.id){
                            console.log(this.credits[i]["id"])
                            this.currentCredit = this.credits[i];
                        } 
                    }
                })
                .catch(e => {
                    console.log(e);
                });
            },
            refreshList() {
                this.retrieveTutorials();
                this.currentTutorial = null;
                this.currentIndex = -1;
            },
            setActiveTutorial(tutorial, index) {
                this.currentCredit = "";
                this.currentTutorial = tutorial;
                this.currentIndex = index;
                this.retrieveCredits();
            },
            searchTitle() {
                console.log(document.location.href);
                this.owner_id = document.location.href.substr(41);
                console.log(this.owner_id);
                CustomerDataService.findByOwnerId(this.owner_id)
                .then(response => {
                    this.tutorials = response.data;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
            }
        },
        mounted() {
            this.retrieveTutorials();
            this.searchTitle();
        }
    }
</script>

<style scoped>
    .list {
        text-align: left;
        max-width: 750px;
        margin: auto;
    }
    .differ {
        margin: 30px;
    }
</style>