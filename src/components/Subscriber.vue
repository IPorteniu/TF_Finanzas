<template>
    <!-- Current Tutorial is available -->
    <div v-if="currentTutorial" class="edit-form">
        <h4>Subscriber</h4>
        <form>
            <div class="form-group">
                <label for="firstName">First Name</label>
                <input type="text" class="form-control" id="firstName" v-model="currentTutorial.firstName"/>
            </div>
            <div class="form-group">
                <label for="lastName">Last Name</label>
                <input type="text" class="form-control" id="lastName" v-model="currentTutorial.lastName"/>
            </div>
            <div class="form-group">
                <label for="age">Age</label>
                <input type="text" class="form-control" id="age" v-model="currentTutorial.age"/>
            </div>
            <div class="form-group">
                <label for="programId">Program ID</label>
                <input type="text" class="form-control" id="programId" v-model="currentTutorial.programId"/>
            </div>
            <div class="form-group">
                <label><strong>Status:</strong>{{ currentTutorial.published ? "Registered" : "Pending" }}</label>
            </div>
        </form>
        <button class="badge badge-primary mr-2" style="background-color: red" v-if="currentTutorial.published"
                @click="updatePublished(false)">Give Up Plan</button>
        <button class="badge badge-primary mr-2" @click="updatePublished(true)">Register Plan</button>
        <button class="badge badge-danger mr-2" @click="deleteTutorial">Delete Subscriber</button>
        <button class="badge badge-success" @click="updateTutorial">Update</button>
        <p>{{ message }}</p>
    </div>
    <!-- Current Tutorial unavailable -->
    <div v-else>
        <br/>
        <p>Please click on a Subscriber</p>
    </div>
</template>

<script>
    import SubscribeDataService from "@/services/SubscribeDataService";

    export default {
        name: "Tutorial",
        data() {
            return {
                currentTutorial: null,
                message: ''
            };
        },
        methods: {
            getTutorial(id) {
                SubscribeDataService.get(id)
                    .then(response => {
                        this.currentTutorial = response.data;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            updatePublished(status) {
                const data = {
                    id: this.currentTutorial.id,
                    firstName: this.currentTutorial.firstName,
                    lastName: this.currentTutorial.lastName,
                    age:this.currentTutorial.age,
                    programId:this.currentTutorial.programId,
                    published: status
                };
                SubscribeDataService.update(this.currentTutorial.id, data)
                    .then(response => {
                        this.currentTutorial.published = status;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            updateTutorial() {
                SubscribeDataService.update(this.currentTutorial.id, this.currentTutorial)
                    .then(response => {
                        console.log(response.data);
                        this.message = 'Plan successfully updated.';
                    })
                    .catch(e => {
                        console.log(e);
                    })
            },
            deleteTutorial() {
                SubscribeDataService.delete(this.currentTutorial.id)
                    .then(response => {
                        console.log(response.data);
                        // Redirect to Tutorials List
                        this.$router.push({name: "subscribers"});
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted() {
            this.message = '';
            this.getTutorial(this.$route.params.id);
        }
    };
</script>

<style scoped>
    .edit-form {
        max-width: 300px;
        margin: auto;
    }
</style>
