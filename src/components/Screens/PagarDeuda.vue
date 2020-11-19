<template>
  <div class="edit-form container shadow">
    <div class="row">
      <div class="col-sm-4 col-md-4 col-lg-4">
        <h4>Pago:</h4>
        <form>
          <div class="form-group">
            <label for="start_date">Fecha de creación de crédito</label>
            <input
              type="text"
              class="form-control"
              id="start_date"
              v-model="invoice.start_date"
              readonly
            />
          </div>
          <div class="form-group">
            <label for="pay_day">Ingresar fecha de pago: </label>
            <input
              type="date"
              class="form-control"
              id="pay_day"
              v-model="pay_day"
            />
          </div>
          <div class="form-group" v-if="interes">
            <label for="interes">Interes generado a la fecha </label>
            <input
              type="text"
              class="form-control"
              id="interes"
              v-model="interes"
              readonly
            />
          </div>
          <div class="form-group" v-if="total_charged">
            <label for="total_charged">Cantidad Acumulada  </label>
            <input
              type="text"
              class="form-control"
              id="total_charged"
              v-model="total_charged"
              readonly
            />
          </div>
          
        </form>
        <div>
          <button v-if="customer" class="badge badge-success" @click="PayDebt">
            Calcular
          </button>
        </div>
      </div>
      <div class="col-sm-4 col-md-4 col-lg-4">
          <div class="form-group" v-if="add_on">
            <label for="add_on">Costos extras (mantenimiento y Mora) </label>
            <input
              type="text"
              class="form-control"
              id="add_on"
              v-model="add_on"
              readonly
            />
          </div>
          <div class="form-group" v-if="total_add_on">
            <label for="total_add_on">Cantidad Total a pagar  </label>
            <input
              type="text"
              class="form-control"
              id="total_add_on"
              v-model="total_add_on"
              readonly
            />
          </div>

          <div class="form-group" v-if="total_add_on">
            <label for="amort">Monto por amortizar  </label>
            <input
              type="text"
              class="form-control"
              id="amort"
              v-model="amort"
            />
          </div>

          <div v-if="total_charged">
          <button v-if="customer" class="badge badge-success" @click="PayPartOf">
            Amortizar
          </button>
          </div>
          <div v-if="total_charged">
          <button v-if="customer" class="badge badge-success" @click="PayAll">
            Pagar Todo
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CustomerDataService from "@/services/CustomersDataService";
import CreditDataService from "@/services/CreditsDataService";
import CreditDetailDataService from "@/services/CreditDetailsDataService";
import InvoiceDataService from "@/services/InvoicesDataService";

import TermDataService from "@/services/TermsDataService";

export default {
  name: "CreditPayment",
  data() {
    return {
      customer: {
        id: null,
        owner_id: "",
        email: "",
        first_name: "",
        last_name: "",
        phone: "",
        address: "",
        password: "",
      },
      credit: {
        id: null,
        customer_id: "",
        currency_id: "",
        active: "",
        amount: "",
        created_in: "",
        arrears: "",
      },
      detail: {
        id: null,
        credit_id: "",
        maintenance: "",
        percentage: "",
        rate_id: "",
        term_id: "",
        capitalization: "",
      },
      invoice: {
        id: null,
        credit_id: "",
        status_id: "",
        charges: "",
        start_date: "",
        end_date: "",
      },
      term: {
        id: null,
        name: "",
        time: "",
      },

      //Calculation variables
      //Tasa Simple
      pay_day: "",
      t: "",
      percentage: "",
      interes: "",

      //Tasa Nominal
      n: "",
      m: "",

      //cargos finales
      add_on: 0,
      total_charged: "",
      total_add_on: "",

      //pago
      amort: "",
    };
  },
  methods: {
    getCustomer(id) {
      CustomerDataService.get(id)
        .then((response) => {
          this.customer = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getCredit(id) {
      CreditDataService.get(id)
        .then((response) => {
          this.credit = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getInvoice(id) {
      InvoiceDataService.get(id)
        .then((response) => {
          this.invoice = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDetail(id) {
      CreditDetailDataService.get(id)
        .then((response) => {
          this.detail = response.data;
          console.log(response.data);

          TermDataService.get(this.detail.term_id)
            .then((response) => {
              this.term = response.data;
              console.log(response.data);
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    PayDebt() {
      console.log(this.credit.created_in);
      var date1 = new Date(this.credit.created_in);
      var date2 = new Date(this.pay_day);
      var date3 = new Date(this.invoice.end_date);


      // To calculate the time difference of two dates
      var Difference_In_Time = date2.getTime() - date1.getTime();

      // To calculate the no. of days between two dates
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

      //To display the final no. of days (result)
      console.log(Difference_In_Days);
      this.t = Difference_In_Days; //Se mantiene para todas las tasas
      if(this.t > 360){
          this.t = 360;
      }

      //Calculo de tasas
      //rate_id 1 = simple; rate_id 2 = Efectiva; rate_id 3 = Nominal;
      if (this.detail.rate_id == 1) {
        this.interes = this.invoice.charges * (this.detail.percentage / 100) * (this.t / 360);
        this.total_charged = this.invoice.charges * (1 + (this.detail.percentage / 100) * (this.t / 360));
        console.log(this.interes);
        console.log(this.total_charged);
      } else {
        if (this.detail.rate_id == 3) {
          this.m = this.term.time / this.detail.capitalization.time;
          this.n = this.t / this.detail.capitalization.time;
          this.total_charged = this.invoice.charges * Math.pow((1 + (this.detail.percentage / 100) / this.m), this.n);
          this.interes = this.total_charged - this.invoice.charges;
          console.log(this.m);
          console.log(this.n);
          console.log(this.total_charged);
        } else {
            if(this.detail.rate_id == 2) {
                this.total_charged = this.invoice.charges * Math.pow((1+this.detail.percentage/100),(this.t/this.term.time));
                this.interes = this.total_charged - this.invoice.charges;
            }
        }
      }
      this.add_on = this.detail.maintenance;
      if(date2 > date3){
          this.add_on = this.credit.arrears + this.detail.maintenance;
      }
      this.total_add_on = this.total_charged + this.add_on;
      this.interes = Number(Math.round(this.interes+'e4')+'e-4');
      this.total_charged = Number(Math.round(this.total_charged+'e2')+'e-2');
      this.total_add_on = Number(Math.round(this.total_add_on+'e2')+'e-2');
    },
    PayAll(){
        this.invoice.charges = 0;
        InvoiceDataService.update(this.invoice.id, this.invoice)
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
        window.history.back();
    },
    PayPartOf(){
        this.invoice.charges = this.total_add_on;
        this.invoice.charges = this.invoice.charges - parseFloat(this.amort);
        InvoiceDataService.update(this.invoice.id, this.invoice)
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
        window.history.back();
    },
  },
  mounted() {
    this.getCustomer(this.$route.params.customer_id);
    this.getCredit(this.$route.params.credit_id);
    this.getInvoice(this.$route.params.invoice_id);
    this.getDetail(this.$route.params.detail_id);
  },
};
</script>
<style scoped>
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

    padding: 10px;
}
</style>