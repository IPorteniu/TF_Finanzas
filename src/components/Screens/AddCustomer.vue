<template>
  <div class="row">
    <div class="col-sm-6 col-md-6 col-lg-6 shadow">
      <h4>Detalles del Cliente:</h4>
      <div class="submit-form">
        <div v-if="!submitted">
          <div class="form-group">
            <label for="firstName">Nombre</label>
            <input
              type="text"
              class="form-control"
              id="firstName"
              required
              v-model="tutorial.first_name"
              name="firstName"
            />
          </div>
          <div class="form-group">
            <label for="lastName">Apellido</label>
            <input
              type="text"
              class="form-control"
              id="lastName"
              required
              v-model="tutorial.last_name"
              name="lastName"
            />
          </div>
          <div class="form-group">
            <label for="age">Correo Electronico</label>
            <input
              type="text"
              class="form-control"
              id="age"
              required
              v-model="tutorial.email"
              name="age"
            />
          </div>
          <div class="form-group">
            <label for="age">Telefono</label>
            <input
              type="text"
              class="form-control"
              id="age"
              required
              v-model="tutorial.phone"
              name="age"
            />
          </div>
          <div class="form-group">
            <label for="age">Dirección</label>
            <input
              type="text"
              class="form-control"
              id="age"
              required
              v-model="tutorial.address"
              name="age"
            />
          </div>
          <div class="form-group">
            <label for="age">Contraseña</label>
            <input
              type="text"
              class="form-control"
              id="age"
              required
              v-model="tutorial.password"
              name="age"
            />
          </div>
          <button @click="saveTutorial" class="btn btn-success">Submit</button>
        </div>
        <div v-else>
          <h4>Successfully submitted.</h4>
          <button class="btn btn-success" @click="newTutorial">Add</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomerDataService from "@/services/CustomersDataService";

export default {
  name: "AddTutorial",
  data() {
    return {
      tutorial: {
        id: null,
        owner_id: "",
        email: "",
        first_name: "",
        last_name: "",
        phone: "",
        address: "",
        password: "",
      },
      submitted: false,
    };
  },
  methods: {
    saveTutorial() {
      const data = {
        owner_id: document.location.href.substr(35),
        email: this.tutorial.email,
        first_name: this.tutorial.first_name,
        last_name: this.tutorial.last_name,
        phone: this.tutorial.phone,
        address: this.tutorial.address,
        password: this.tutorial.password,
      };

      CustomerDataService.create(data)
        .then((response) => {
          this.tutorial.id = response.data.id;
          console.log(response.data);
          document.location.href = `/owner/my_customers/${response.data["owner_id"]}`;
          this.submited = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    newTutorial() {
      this.submited = false;
      this.tutorial = {};
    },
  },
};
</script>

<style scoped>
.shadow {
    -webkit-box-shadow: 0 8px 6px -6px #999;
    -moz-box-shadow: 0 8px 6px -6px #999;
    box-shadow: 0 20px 6px -6px #999;
    z-index: 10;
    height: 650px;
    width: 700px;
    background-color: rgb(255, 255, 255);
    margin-top: 30px;
    margin-left: 350px;

    padding: 10px;
}
</style>