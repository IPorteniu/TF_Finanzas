<template>
  <div class="list row shadow">
    <!-- Search Panel -->
    <div class="col-md-8 differS">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Buscar por nombre"
          v-model="first_name"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchCustomer"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <!-- Tutorials List Panel -->
    <div class="col-md-6">
      <h4>My Customers</h4>
      <ul class="list-group">
        <li
          style="background-color: #ffa504"
          class="list-group-item"
          :class="{ active: index === currentIndex }"
          v-for="(tutorial, index) in tutorials"
          :key="index"
          @click="setActiveTutorial(tutorial, index)"
        >
          {{ tutorial.first_name }}
        </li>
      </ul>
    </div>
    <!-- Current Tutorial Panel -->
    <div class="col-md-6">
      <div v-if="currentTutorial">
        <h4>Customer Info</h4>
        <div>
          <label
            ><strong>Name:</strong
            >{{
              currentTutorial.first_name + " " + currentTutorial.last_name
            }}</label
          >
        </div>
        <div>
          <label><strong>Email:</strong>{{ currentTutorial.email }}</label>
        </div>
        <div>
          <label
            ><strong>Owner ID:</strong>{{ currentTutorial.owner_id }}</label
          >
        </div>
        <div v-if="currentCredit">
          <label
            ><strong>Credit ID:</strong>
            <p id="cred">{{ currentCredit.id }}</p></label
          >
        </div>
        <div v-if="currentCredit">
          <label
            ><strong>Credit amount:</strong>{{ currentCredit.amount }}</label
          >
        </div>
        <div v-if="currentCredit">
          <label
            ><strong>Credit created_in:</strong
            >{{ currentCredit.created_in }}</label
          >
        </div>
        <a
          v-if="currentCredit == ''"
          class="badge badge-warning"
          style="background-color: lightblue"
          :href="'/add-credit/' + currentTutorial.id"
          >Definir Crédito</a
        >
        <a
          v-if="currentCredit"
          class="badge badge-warning"
          style="background-color: orange"
          @click="retrieveInvoice"
          >Agregar una venta</a
        >
      </div>
      <div v-else>
        <br />
        <p>Please click on a Subscriber.</p>
      </div>
    </div>
    <div class="differ">
    <a
      class="badge badge-warning differ"
      style="background-color: orange"
      :href="'/add-customer/' + this.owner_id"
      >Agregar Cliente</a
    >
    </div>
  </div>
</template>

<script>
import CustomerDataService from "@/services/CustomersDataService";
import CreditDataService from "@/services/CreditsDataService";
import InvoiceDataService from "@/services/InvoicesDataService";
import OrderDataService from "@/services/OrdersDataService";

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
      address: "",
      password: "",

      credits: [],
      currentCredit: "",
      customer_id: "",

      invoices: [],
      currentInvoice: "",

      order: {
        id: null,
        invoice_id: "",
        date: "",
        total_price: 0,
      },
    };
  },
  methods: {
    retrieveTutorials() {
      CustomerDataService.getAll()
        .then((response) => {
          this.tutorials = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    retrieveCredits() {
      CreditDataService.getAll()
        .then((response) => {
          this.credits = response.data;
          console.log(response.data);
          var i;
          for (i = 0; i < this.credits.length; i++) {
            if (this.credits[i]["customer_id"] == this.currentTutorial.id) {
              console.log(this.credits[i]["id"]);
              this.currentCredit = this.credits[i];
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    retrieveInvoice() {
      var cred = document.getElementById("cred").innerHTML;
      InvoiceDataService.findByCreditId(cred)
        .then((response) => {
          this.invoices = response.data;
          console.log(response.data);
          this.currentInvoice = this.invoices[0];
          console.log(this.currentInvoice["id"]);
          console.log(this.order.date);
          const data = {
            invoice_id: this.currentInvoice["id"],
            date: this.order.date,
            total_price: 0,
          };

          OrderDataService.create(data)
            .then((response) => {
              this.order.id = response.data.id;
              console.log(response.data);
              this.submited = true;
              document.location.href = `/add-sale/customer/${this.currentTutorial.id}/invoice/${this.currentInvoice["id"]}/order/${this.order.id}`;
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => {
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
        .then((response) => {
          this.tutorials = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    searchCustomer() {
      CustomerDataService.findByFirstName(this.first_name)
        .then((response) => {
          this.tutorials = response.data;
          console.log(response.data);
          if (this.tutorials.length == 0) {
            this.refreshList();
            this.searchTitle();
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    GetCurrentDate() {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      today = mm + "-" + dd + "-" + yyyy;
      this.order.date = today;
    },
  },
  mounted() {
    this.retrieveTutorials();
    this.searchTitle();
    this.GetCurrentDate();
  },
};
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
.shadow {
    -webkit-box-shadow: 0 8px 6px -6px #999;
    -moz-box-shadow: 0 8px 6px -6px #999;
    box-shadow: 0 20px 6px -6px #999;
    z-index: 1000;
    height: 600px;
    width: 700px;
    background-color: rgb(255, 255, 255);
    margin-top: 30px;
    margin-left: 300px;

    padding: 10px;
}
.differ{
   margin-left: 10px;
}
.differS{
   margin-bottom: -40px;
}
</style>