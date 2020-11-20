<template>
  <div class="edit-form container shadow">
    <div class="row">
      <div class="col-sm-3 col-md-3 col-lg-3">
        <h4>Mi Perfil:</h4>
        <form>
          <div class="form-group">
            <label for="first_name">First Name</label>
            <input
              type="text"
              class="form-control"
              id="first_name"
              v-model="customer.first_name"
            />
          </div>
          <div class="form-group">
            <label for="last_name">Last Name</label>
            <input
              type="text"
              class="form-control"
              id="last_name"
              v-model="customer.last_name"
            />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="text"
              class="form-control"
              id="email"
              v-model="customer.email"
            />
          </div>
          <div class="form-group">
            <label for="phone">Phone</label>
            <input
              type="text"
              class="form-control"
              id="phone"
              v-model="customer.phone"
            />
          </div>
          <div class="form-group">
            <label for="phone">Address</label>
            <input
              type="text"
              class="form-control"
              id="address"
              v-model="customer.address"
            />
          </div>
        </form>
      </div>

      <div class="col-sm-3 col-md-3 col-lg-3">
        <h4>Mi Crédito:</h4>
        <form>
          <div class="form-group">
            <label for="amount">Monto de Crédito</label>
            <input
              type="text"
              class="form-control"
              id="amount"
              v-model="credit.amount"
              readonly
            />
          </div>
          <div class="form-group">
            <label for="charges">Crédito utilizado</label>
            <input
              type="text"
              class="form-control"
              id="charges"
              v-model="invoice.charges"
              readonly
            />
          </div>
          <div class="form-group">
            <label for="credit_remain">Crédito restante</label>
            <input
              type="text"
              class="form-control"
              id="credit_remain"
              v-model="credit_remain"
              readonly
            />
          </div>
          <div class="form-group">
            <label for="percentage">Tasa (%) </label>
            <input
              type="text"
              class="form-control"
              id="percentage"
              v-model="detail.percentage"
              readonly
            />
          </div>
          <div class="form-group">
            <label for="created_in">Tipo de tasa</label>
            <input
              type="text"
              class="form-control"
              id="created_in"
              v-model="rate.name"
              readonly
            />
          </div>
          <div class="form-group">
            <label for="arrears"></label>
            <input
              type="text"
              class="form-control"
              id="arrears"
              v-model="term.name"
              readonly
            />
          </div>
          <div class="form-group" v-if="detail.capitalization">
            <label for="maintenance">Capitalización</label>
            <input
              type="text"
              class="form-control"
              id="maintenance"
              v-model="detail.capitalization.name"
              readonly
            />
          </div>
        </form>
      </div>

      <div class="col-sm-3 col-md-3 col-lg-3">
        <h4>Más Detalles:</h4>
        <form>
          <div class="form-group">
            <label for="created_in">Fecha de creación de crédito</label>
            <input
              type="text"
              class="form-control"
              id="created_in"
              v-model="credit.created_in"
              readonly
            />
          </div>
          <div class="form-group">
            <label for="created_in">Ultimo día para pagar</label>
            <input
              type="text"
              class="form-control"
              id="created_in"
              v-model="invoice.end_date"
              readonly
            />
          </div>
          <div class="form-group">
            <label for="arrears">Costo por mora</label>
            <input
              type="text"
              class="form-control"
              id="arrears"
              v-model="credit.arrears"
              readonly
            />
          </div>
          <div class="form-group">
            <label for="maintenance">Costo por mantenimiento</label>
            <input
              type="text"
              class="form-control"
              id="maintenance"
              v-model="detail.maintenance"
              readonly
            />
          </div>
          <div class="form-group">
            <label for="maintenance">Moneda del crédito</label>
            <input
              type="text"
              class="form-control"
              id="maintenance"
              v-model="currency.name"
              readonly
            />
          </div>
          <div class="form-group">
            <label for="maintenance">Estado del crédito</label>
            <input
              type="text"
              class="form-control"
              id="maintenance"
              v-model="status.name"
              readonly
            />
          </div>
        </form>
      </div>
      <div class="col-sm-3 col-md-3 col-lg-3">
        <h4>Mis Compras:</h4>
        <ul class="list-group">
          <li
            style="background-color: #ffa504"
            class="list-group-item"
            :class="{ active: index === currentIndex }"
            v-for="(order, index) in orders"
            :key="index"
            @click="setActiveOrder(order, index)"
          >
            N°{{ order.id }} ({{ order.date }})
          </li>
        </ul>
        <div v-if="currentOrder">
          <div>
            <button
              v-if="customer"
              class="badge badge-success"
              @click="viewOrderDetail"
            >
              Ver Detalles de Orden
            </button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <button
        v-if="customer"
        class="badge badge-success"
        @click="updateCustomer"
      >
        Actualizar mi perfil
      </button>
    </div>
    <div>
      <button v-if="customer" class="badge badge-success" @click="viewPayment">
        Proceder a pagar
      </button>
      <button v-if="customer" class="badge badge-success differB" @click="printPage">
        Imprimir reporte
      </button>
    </div>
    <div></div>
  </div>
</template>

<script>
import CustomerDataService from "@/services/CustomersDataService";
import CreditDataService from "@/services/CreditsDataService";
import CreditDetailDataService from "@/services/CreditDetailsDataService";
import InvoiceDataService from "@/services/InvoicesDataService";

import StatDataService from "@/services/StatusDataService";
import CurrencyDataService from "@/services/CurrenciesDataService";
import RateDataService from "@/services/RatesDataService";
import TermDataService from "@/services/TermsDataService";
import OrderDataService from "@/services/OrdersDataService";

export default {
  name: "ViewCustomer",
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
      rate: {
        id: null,
        name: "",
      },
      currency: {
        id: null,
        name: "",
        unit: "",
      },
      status: {
        id: null,
        name: "",
      },
      order: {
        id: null,
        invoice_id: "",
        date: "",
        total_price: 0,
      },

      orders: [],
      currentOrder: null,
      currentIndex: -1,
      credit_remain: "",
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
    updateCustomer() {
      CustomerDataService.update(this.customer.id, this.customer)
        .then((response) => {
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

          CurrencyDataService.get(this.credit.currency_id)
            .then((response) => {
              this.currency = response.data;
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
    getInvoice(id) {
      InvoiceDataService.get(id)
        .then((response) => {
          this.invoice = response.data;
          console.log(response.data);

          StatDataService.get(this.invoice.status_id)
            .then((response) => {
              this.status = response.data;
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

          RateDataService.get(this.detail.rate_id)
            .then((response) => {
              this.rate = response.data;
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
    retrieveOrders(id) {
      OrderDataService.findByInvoiceId(id)
        .then((response) => {
          this.orders = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    setActiveOrder(order, index) {
      this.currentOrder = order;
      this.currentIndex = index;
    },
    viewOrderDetail() {
      document.location.href = `/order-detail/${this.currentOrder.id}/view/${this.$route.params.customer_id}`;
    },
    viewPayment() {
      document.location.href = `/credit-payment/customer/${this.$route.params.customer_id}/credit/${this.$route.params.credit_id}/detail/${this.$route.params.detail_id}/invoice/${this.$route.params.invoice_id}`;
    },
    getCreditRemain(credit, invoice) {
      CreditDataService.get(credit)
        .then((response) => {
          this.credit1 = response.data;
          console.log(response.data);
          InvoiceDataService.get(invoice)
            .then((response) => {
              this.invoice1 = response.data;
              console.log(response.data);
              this.credit_remain = this.credit1.amount - this.invoice1.charges;
              this.credit_remain = Number(Math.round(this.credit_remain+'e2')+'e-2');        
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    printPage(){
      window.print();
    },
  },
  mounted() {
    this.getCustomer(this.$route.params.customer_id);
    this.getCredit(this.$route.params.credit_id);
    this.getInvoice(this.$route.params.invoice_id);
    this.getDetail(this.$route.params.detail_id);
    this.retrieveOrders(this.$route.params.invoice_id);
    this.getCreditRemain(this.$route.params.credit_id, this.$route.params.invoice_id);
  },
};
</script>

<style scoped>
.submit-form {
  max-width: 300px;
  margin: auto;
}
.shadow {
  -webkit-box-shadow: 0 8px 6px -6px #999;
  -moz-box-shadow: 0 8px 6px -6px #999;
  box-shadow: 0 20px 6px -6px #999;
  z-index: 10;
  height: 710px;
  width: 1200px;
  background-color: rgb(255, 255, 255);
  margin-top: 30px;
  margin-left: 80px;

  padding: 20px;
}
.differB{
  margin-left: 860px;
}
</style>
