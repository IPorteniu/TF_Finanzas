<template>
  <div class="col-sm-24 col-md-24 col-lg-24 shadow">
    <h4>Detalles de la línea:</h4>
    <form>
      <div class="container">
        <div class="row">
          <div class="col-sm-3 col-md-3 col-lg-3">
            <p>Tipo de tasa</p>
            <ul class="list-group">
              <li
                style="background-color: #ffa504"
                class="list-group-item"
                :class="{ active: index === currentIndexRate }"
                v-for="(rate, index) in rates"
                :key="index"
                @click="setActiveRate(rate, index)"
              >
                {{ rate.name }}
              </li>
            </ul>
          </div>

          <div class="col-sm-3 col-md-3 col-lg-3">
            <p>Periodo</p>
            <ul class="list-group">
              <li
                style="background-color: #ffa504"
                class="list-group-item"
                :class="{ active: index === currentIndex }"
                v-for="(term, index) in terms"
                :key="index"
                @click="setActiveTerm(term, index)"
              >
                {{ term.name }}
              </li>
            </ul>
          </div>
          
          <div class="col-sm-3 col-md-3 col-lg-3" v-if="currentRate">
            <ul
              class="list-group"
              v-if="
                currentRate.name == 'Nominal'
              "
            >
              <p>Capitalización</p>
              <li
                style="background-color: #ffa504"
                class="list-group-item"
                :class="{ active: index === currentIndexCap }"
                v-for="(term, index) in terms"
                :key="index"
                @click="setActiveCap(term, index)"
              >
                {{ term.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-md-6 col-lg-6">
        <div class="form-group" v-if="currentRate">
          <label for="rate"></label>
          <input
            type="text"
            class="form-control differ"
            id="rate"
            v-model="currentRate.name"
            readonly
          />
        </div>

        <div class="form-group" v-if="currentTerm">
          <label for="term"></label>
          <input
            type="text"
            class="form-control differ"
            id="term"
            v-model="currentTerm.name"
            readonly
          />
        </div>

        <div class="form-group" v-if="currentCap">
          <label for="capitalization">Capitalización</label>
          <input
            type="text"
            class="form-control differ"
            id="capitalization"
            v-model="currentCap.name"
            readonly
          />
        </div>

        <div class="form-group">
          <label for="percentage">Tasa (%)</label>
          <input
            type="text"
            class="form-control"
            id="percentage"
            v-model="credit_detail.percentage"
          />
        </div>

        <div class="form-group">
          <label for="maintenance">Costo fijo de mantenimiento</label>
          <input
            type="text"
            class="form-control"
            id="maintenance"
            v-model="credit_detail.maintenance"
          />
        </div>
      </div>
    </form>
    <button class="badge badge-success" @click="saveCreditDetails">
      Confirmar
    </button>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import CustomerDataService from "@/services/CustomersDataService";
import TermDataService from "@/services/TermsDataService";
import RateDataService from "@/services/RatesDataService";
import CreditDetailDataService from "@/services/CreditDetailsDataService";

export default {
  data() {
    return {
      //Current Customer Add-credit
      currentTutorial: null,
      message: "",

      //term display data
      terms: [],
      currentTerm: null,
      currentIndex: -1,

      name: "",

      // rate display data
      rates: [],
      currentRate: null,
      currentIndexRate: -1,

      //Capitalization display data
      currentCap: null,
      currentIndexCap: -1,

      //Credit Detail input data
      credit_detail: {
        id: null,
        credit_id: "",
        maintenance: "",
        percentage: "",
        rate_id: "",
        term_id: "",
        capitalization: "",
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

    retrieveTerms() {
      TermDataService.getAll()
        .then((response) => {
          this.terms = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    setActiveTerm(term, index) {
      this.currentTerm = term;
      this.currentIndex = index;
    },

    retrieveRates() {
      RateDataService.getAll()
        .then((response) => {
          this.rates = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    setActiveRate(rate, index) {
      this.currentRate = rate;
      this.currentIndexRate = index;
      this.currentCap = null;
      this.currentIndexCap = -1;
      if (
        this.currentRate.name == "Efectiva" ||
        this.currentRate.name == "Nominal"
      ) {
        this.currentIndex = 2;
        this.currentIndexCap = 3;
      }
      if (this.currentRate.name == "Simple") {
        this.currentIndex = 2;
      }
    },
    setActiveCap(cap, index) {
      this.currentCap = cap;
      this.currentIndexCap = index;
    },

    saveCreditDetails() {
      const data = {
        credit_id: parseInt(this.$route.params.credit_id),
        maintenance: parseInt(this.credit_detail.maintenance),
        percentage: parseInt(this.credit_detail.percentage),
        rate_id: this.currentRate.id,
        term_id: this.currentTerm.id,
        capitalization: this.currentCap,
      };
      console.log(data);

      CreditDetailDataService.create(data)
        .then((response) => {
          this.credit_detail.id = response.data.id;
          document.location.href = `/owner/my_customers/${this.currentTutorial.owner_id}`;
          console.log(this.currentCredit);
          this.submited = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    console.log(this.$route.params);
    this.getTutorial(this.$route.params.id);
    this.retrieveTerms();
    this.retrieveRates();
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
    height: 720px;
    width: 700px;
    background-color: rgb(255, 255, 255);
    margin-top: 0px;
    margin-left: 300px;

    padding: 20px;
}
.differ{
  margin: -7px;
}
</style>