<template>
  <div class="login">
    <h1 class="title">Login Empresa</h1>
    <form action class="form">
      <label class="form-label" for="#email">RUC:</label>
      <input class="form-input" type="text" id="ruc" required placeholder="RUC" v-model="ruc">
      <label class="form-label" for="#password">Password:</label>
      <input class="form-input" type="password" id="password" placeholder="Password" v-model="password">
      <input class="form-submit" type="button" value="Login" @click="searchRuc()">
      <p class="passMessage" v-if="this.status == 2">Error en contraseña o usuario</p>
    </form>
  </div>
</template>

<script>
    import OwnerDataService from "@/services/OwnersDataService";

    export default {
        name: "Login",
        data() {
            return {
                tutorials: [],
                currentTutorial: null,
                
                ruc: "",
                password:"",
                currentIndex: "",

                originalPassword: "",
                status: "",
            };
        },
        methods: {
            retrieveTutorials() {
                OwnerDataService.getAll()
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
            searchRuc() {
                OwnerDataService.findByRuc(this.ruc)
                .then(response => {
                    console.log(response.data[0]["password"])
                    console.log(this.password)
                    this.originalPassword = response.data[0]["password"]
                    this.status = 2;
                    if(this.password == response.data[0]["password"]) {
                        this.status = 1;
                        console.log(this.status)
                        console.log(response.data[0]["id"])
                        if(this.status == 1) {
                          this.currentTutorial = response.data[0];
                          document.location.href = `/owner/my_customers/${response.data[0]["id"]}`;
                        }
                    }
                    
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
.login {
  padding: 2rem;
  margin-left: 200px;
}
.title {
  text-align: center;
}
.form {
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  min-width: 350px;
  max-width: 100%;
  background: rgba(19, 35, 47, 0.9);
  border-radius: 5px;
  padding: 40px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
}
.form-label {
  margin-top: 2rem;
  color: white;
  margin-bottom: 0.5rem;
}
.form-input {
  padding: 10px 15px;
  background: none;
  background-image: none;
  border: 1px solid white;
  color: white;
}
.form-submit {
  background: #1ab188;
  border: none;
  color: white;
  margin-top: 3rem;
  padding: 1rem 0;
  cursor: pointer;
  transition: background 0.2s;
}
.passMessage {
  margin-top: 10px;
  color: whitesmoke;;
  font-size: 20px;
}
</style>