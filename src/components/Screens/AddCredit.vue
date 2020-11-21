<template>
  <!-- Current Tutorial is available -->

  <div v-if="currentTutorial" class="edit-form container shadow">
    <div class="row">
      <div class="col-sm-6 col-md-6 col-lg-6">
        <h4>Detalles del Cliente:</h4>
        <form>
          <div class="form-group">
            <label for="first_name">First Name</label>
            <input
              type="text"
              class="form-control"
              id="first_name"
              v-model="currentTutorial.first_name"
              readonly
            />
          </div>
          <div class="form-group">
            <label for="last_name">Last Name</label>
            <input
              type="text"
              class="form-control"
              id="last_name"
              v-model="currentTutorial.last_name"
              readonly
            />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="text"
              class="form-control"
              id="email"
              v-model="currentTutorial.email"
              readonly
            />
          </div>
          <div class="form-group">
            <label for="phone">Phone</label>
            <input
              type="text"
              class="form-control"
              id="phone"
              v-model="currentTutorial.phone"
              readonly
            />
          </div>
        </form>
      </div>
      <div class="col-sm-6 col-md-6 col-lg-6" v-if="!submitedCredit">
        <h4>Crédito:</h4>
        <div class="form-group">
          <label for="amount">Monto de crédito otorgado</label>
          <input
            type="number"
            class="form-control"
            id="amount"
            v-model="credit.amount"
          />
        </div>
        <div class="form-group">
          <label for="created_in">Fecha (MM-DD-AAAA)</label>
          <input
            type="text"
            class="form-control"
            id="created_in"
            v-model="credit.created_in"
            readonly
          />
        </div>
        <div class="form-group">
          <label for="arrears">Monto por mora</label>
          <input
            type="number"
            class="form-control"
            id="arrears"
            v-model="credit.arrears"
          />
        </div>

        <ul class="list-group">
          <li
            style="background-color: orange"
            class="list-group-item"
            :class="{ active: index === currentIndexCurrency }"
            v-for="(currency, index) in currencies"
            :key="index"
            @click="setActiveCurrency(currency, index)"
          >
            {{ currency.name }}
          </li>
        </ul>

        <button class="badge badge-success differ" @click="saveCredit">
          Siguiente
        </button>
      </div>
      <div v-else>
        <h4>Successfully submitted.</h4>
        <button class="btn btn-success" @click="newCredit">Add</button>
      </div>
    </div>
  </div>
  <!-- Current Tutorial unavailable -->
  <div v-else>
    <br />
    <p>Please click on a Subscriber</p>
  </div>
</template>

<script>
import CustomerDataService from "@/services/CustomersDataService";
import CreditDataService from "@/services/CreditsDataService";
import InvoiceDataService from "@/services/InvoicesDataService";
import CurrencyDataService from "@/services/CurrenciesDataService";

export default {
  name: "Tutorial",
  data() {
    return {
      //Current Customer Add-credit
      currentTutorial: null,
      message: "",

      //Currency display data
      currencies: [],
      currentCurrency: null,
      currentIndexCurrency: -1,

      //Credit input data
      credit: {
        id: null,
        customer_id: "",
        currency_id: "",
        active: "",
        amount: "",
        created_in: "",
        arrears: "",
      },
      submitedCredit: false,
      currentCredit: 0,

      //Invoice input data
      invoice: {
        id: null,
        credit_id: "",
        status_id: "",
        charges: "",
        start_date: "",
        end_date: "",
      },
    };
  },
  methods: {
    getTutorial(id) {
      CustomerDataService.get(id)
        .then((response) => {
          this.currentTutorial = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateTutorial() {
      CustomerDataService.update(this.currentTutorial.id, this.currentTutorial)
        .then((response) => {
          console.log(response.data);
          this.message = "Plan successfully updated.";
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteTutorial() {
      CustomerDataService.delete(this.currentTutorial.id)
        .then((response) => {
          console.log(response.data);
          // Redirect to Tutorials List
          this.$router.push({ name: "subscribers" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    
    CreateInvoice() {
      const data = {
        credit_id: this.currentCredit,
        status_id: 0,
        charges: 0,
        start_date: this.credit.created_in,
        end_date: this.end_date,
      };
      console.log(data);

      InvoiceDataService.create(data)
        .then((response) => {
          this.invoice.id = response.data.id;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    retrieveCurrency() {
      CurrencyDataService.getAll()
        .then((response) => {
          this.currencies = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    setActiveCurrency(currency, index) {
      this.currentCurrency = currency;
      this.currentIndexCurrency = index;
    },

    saveCredit() {
      const data = {
        customer_id: this.currentTutorial.id,
        currency_id: this.currentCurrency.id,
        active: 0,
        amount: parseInt(this.credit.amount),
        created_in: this.credit.created_in,
        arrears: parseInt(this.credit.arrears),
      };
      console.log(data);

      CreditDataService.create(data)
        .then((response) => {
          this.credit.id = response.data.id;
          this.currentCredit = this.credit.id;
          this.CreateInvoice();
          document.location.href = `/add-credit/${this.currentTutorial.id}/${this.currentCredit}`;

          console.log(this.currentCredit);
          console.log(response.data);
          this.submited = true;
        })
        .catch((e) => {
          console.log(e);
        });
      console.log(this.invoice);
    },

    newCredit() {
      this.submitedCredit = false;
      this.credit = {};
    },
    GetCurrentDate() {
      var today = new Date();
      var end_month = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      today = mm + "-" + dd + "-" + yyyy;
      //Si el invoice fue creado despues de la mitad del mes, el último día para pagar será el 30 del mes siguiente
      if (dd > 15) {
        end_month = String(parseInt(mm) + 1) + "-" + 30 + "-" + yyyy;
      } else {
        end_month = mm + "-" + 30 + "-" + yyyy;
      }
      console.log(today);

      //Utilizado por Credit e Invoice
      this.credit.created_in = today;

      //Utilizado por invoice
      this.end_date = end_month;
    },
  },

  mounted() {
    this.message = "";
    this.retrieveCurrency();
    this.getTutorial(this.$route.params.id);
    console.log(this.$route);
    
    this.GetCurrentDate();
  },
};
</script>

<style scoped>
.edit-form {
  max-width: 1100px;
  margin: auto;
  margin-left: 60px;
}
.shadow {
    -webkit-box-shadow: 0 8px 6px -6px #999;
    -moz-box-shadow: 0 8px 6px -6px #999;
    box-shadow: 0 20px 6px -6px #999;
    z-index: 1000;
    height: 500px;
    width: 700px;
    background-color: rgb(255, 255, 255);
    margin-top: 30px;
    margin-left: 300px;

    padding: 20px;
}
.differ{
  margin-top: 20px;
}
</style>