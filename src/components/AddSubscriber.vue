<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <div class="form-group">
                <label for="firstName">First Name</label>
                <input type="text" class="form-control" id="firstName" required v-model="tutorial.firstName" name="firstName"/>
            </div>
            <div class="form-group">
                <label for="lastName">Last Name</label>
                <input type="text" class="form-control" id="lastName" required v-model="tutorial.lastName" name="lastName"/>
            </div>
            <div class="form-group">
                <label for="age">Age</label>
                <input type="text" class="form-control" id="age" required v-model="tutorial.age" name="age"/>
            </div>
            <button @click="saveTutorial" class="btn btn-success">Submit</button>
        </div>
        <div v-else>
            <h4>Successfully submitted.</h4>
            <button class="btn btn-success" @click="newTutorial">Add</button>
        </div>
    </div>
</template>

<script>
    import SubscribeDataService from "@/services/SubscribeDataService";

    export default {
        name: "AddTutorial",
        data() {
            return {
                tutorial: {
                    id: null,
                    firstName: "",
                    lastName: "",
                    age: "",
                },
                submitted: false
            };
        },
        methods: {
            saveTutorial() {
                const data = {
                    firstName: this.tutorial.firstName,
                    lastName: this.tutorial.lastName,
                    age:this.tutorial.age,
                    programId:this.tutorial.programId
                };

                SubscribeDataService.create(data)
                .then(response => {
                    this.tutorial.id = response.data.id;
                    console.log(response.data);
                    this.submited = true;
                })
                .catch(e => {
                    console.log(e);
                });
            },
            newTutorial() {
                this.submited = false;
                this.tutorial = {};
            }
        }
    }
</script>

<style scoped>
    .submit-form {
        max-width: 300px;
        margin: auto;
    }
</style>
