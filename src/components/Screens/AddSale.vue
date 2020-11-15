<template>
    <div class="list row">
        <!-- Search Panel -->
        <div class="col-md-8">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Producto" v-model="name"/>
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click="searchTitle">Search</button>
                </div>
            </div>
        </div>
        <!-- Tutorials List Panel -->
        <div class="col-md-6">
            <h4>Product List</h4>
            <ul class="list-group">
                <li style="background-color: #ffa504" class="list-group-item" :class="{ active: index === currentIndex }"
                    v-for="(tutorial, index) in tutorials" :key="index"
                    @click="setActiveTutorial(tutorial, index)">{{ tutorial.name}}
                </li>
            </ul>
        </div>
        <!-- Current Tutorial Panel -->
        <div class="col-md-6">
            <div v-if="currentTutorial">
                <h4>Product Info</h4>
                <div>
                    <label><strong>Name:</strong>{{ currentTutorial.name}}</label>
                </div>
                <div>
                    <label><strong>Precio:</strong>{{ currentTutorial.price}}</label>
                </div>
            </div>
            <div v-else>
                <br/>
                <p>Haz click en un producto para agregarlo a la compra del cliente.</p>
            </div>
        </div>
    </div>
</template>

<script>
    import ProductDataService from "@/services/ProductsDataService";

    export default {
        name: "CustomerList",
        data() {
            return {
                tutorials: [],
                currentTutorial: null,
                currentIndex: -1,
                
                name: "",

            };
        },
        methods: {
            retrieveTutorials() {
                ProductDataService.getAll()
                .then(response => {
                    this.tutorials = response.data;
                    console.log(response.data);
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
                this.currentTutorial = tutorial;
                this.currentIndex = index;
            },
            searchTitle() {
                ProductDataService.findByNombre(this.name)
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