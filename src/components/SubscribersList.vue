<template>
    <div class="list row">
        <!-- Search Panel -->
        <div class="col-md-8">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="firstName" v-model="firstName"/>
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click="searchTitle">Search</button>
                </div>
            </div>
        </div>
        <!-- Tutorials List Panel -->
        <div class="col-md-6">
            <h4>Subscribers List</h4>
            <ul class="list-group">
                <li style="background-color: #ffa504" class="list-group-item" :class="{ active: index === currentIndex }"
                    v-for="(tutorial, index) in tutorials" :key="index"
                    @click="setActiveTutorial(tutorial, index)">{{ tutorial.firstName}}
                </li>
            </ul>
        </div>
        <!-- Current Tutorial Panel -->
        <div class="col-md-6">
            <div v-if="currentTutorial">
                <h4>Recruit Info</h4>
                <div>
                    <label><strong>Name:</strong>{{ currentTutorial.firstName + " " + currentTutorial.lastName}}</label>
                </div>
                <div>
                    <label><strong>Age:</strong>{{ currentTutorial.age }}</label>
                </div>
                <div>
                    <label><strong>Program ID:</strong>{{ currentTutorial.programId }}</label>
                </div>
                <div>
                    <label><strong>Status:</strong>{{ currentTutorial.published ? "Registered" : "Pending" }}</label>
                </div>
                <a class="badge badge-warning" style="background-color: lightblue" :href="'/subscribers/'+currentTutorial.id">Edit</a>
            </div>
            <div v-else>
                <br/>
                <p>Please click on a Subscriber.</p>
            </div>
        </div>
    </div>
</template>

<script>
    import SubscribeDataService from "@/services/SubscribeDataService";

    export default {
        name: "TutorialsList",
        data() {
            return {
                tutorials: [],
                currentTutorial: null,
                currentIndex: -1,
                firstName: "",
                lastName: "",
                age:"",
                programId:""
            };
        },
        methods: {
            retrieveTutorials() {
                SubscribeDataService.getAll()
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
                SubscribeDataService.findByTitle(this.firstName)
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
</style>
