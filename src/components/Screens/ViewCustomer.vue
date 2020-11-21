<template>
  <div class="edit-form container">
    <div class="row">
      <div class="col-sm-6 col-md-6 col-lg-6 shadow">
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
        <div>
          <button
            v-if="customer"
            class="badge badge-success differ"
            @click="updateCustomer"
          >
            Actualizar mi perfil
          </button>
        </div>
        <div>
          <button
            v-if="customer"
            class="badge badge-success"
          >
            Ver mi crédito
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
        product_id: "",
        order_id: "",
        quantity: "",
        price_detail: "",
      },
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
    viewCustomerCredit() {
      CreditDataService.findByCustomerId(this.$route.params.id)
        .then((response) => {
          this.credit = response.data;
          console.log(this.credit);
          CreditDetailDataService.findByCreditId(this.credit[0].id)
            .then((response) => {
              this.detail = response.data;
              console.log(this.detail);
              InvoiceDataService.findByCreditId(this.credit[0].id)
                .then((response) => {
                  this.invoice = response.data;
                  console.log(this.invoice);
                  window.location.href = `/customer-profile/${this.$route.params.id}/credit/${this.credit[0].id}/detail/${this.detail[0].id}/invoice/${this.invoice[0].id}`;
                })
                .catch((e) => {
                  console.log(e);
                });
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.viewCustomerCredit();
    this.getCustomer(this.$route.params.id);
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
  height: 580px;
  width: 700px;
  background-color: rgb(255, 255, 255);
  margin-top: 30px;
  margin-left: 400px;

  padding: 10px;
}
.differ{
  margin-top: 20px;
}
</style>
