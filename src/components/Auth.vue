<script>
import api from "../api";
import EmailForm from "./Email.vue";
import ForgotPassword from "./ForgotPassword.vue";
import OneTimePassword from "./OneTimePassword.vue";
export default {
  data() {
    return {
      login_url:
        process.env.NODE_ENV !== "production"
          ? import.meta.env.VITE_DEV_API_URL + "/auth"
          : import.meta.env.VITE_PROD_API_URL + "/auth",
      tab: "main",
      nick: "",
      email: "",
      password: "",
      error: "",
      login_loading: false,
    };
  },
  computed: {
    ButtonDisabled() {
      if (this.nick.length > 2 && this.password.length > 6) return false;
      else return true;
    },
  },
  methods: {
    register(data) {
      this.email = data;
      api
        .post("/auth/local/register", {
          username: this.nick,
          email: this.email,
          password: this.password,
        })
        .then((r) => {
          this.$cookies.set("auth-token", r.data.token);
          // console.log(r.data.token);
          location.reload();
        });
    },
    login() {
      this.login_loading = true;
      api
        .post("/auth/local/login", {
          login_name: this.nick,
          password: this.password,
        })
        .then((r) => {
          if (r.data.error) {
            this.error = r.data.error;
            this.login_loading = false;
          } else {
            this.login_loading = false;
            this.$cookies.set("auth-token", r.data.token);
            location.reload();
          }
        });
    },
    tabChanger(e) {
      this.tab = e;
    },
  },
  components: {
    EmailForm,
    ForgotPassword,
    OneTimePassword,
  },
};
</script>

<template>
  <div class="columns">
    <div class="column col-3 col-sm-12 col-md-6 col-mx-auto">
      <div class="box" v-if="tab === 'main'">
        <div class="toast toast-error mb-2" v-if="error">
          <button
            class="btn btn-clear float-right"
            @click.prevent="error = ''"
          ></button>
          {{ error }}
        </div>
        <form action="">
          <input
            class="form-input mb-2 ph"
            type="text"
            placeholder="Slapyvardis"
            v-model="nick"
          />
          <input
            class="form-input mb-2 ph"
            type="password"
            placeholder="Slaptažodis"
            v-model="password"
          />
          <div class="btn-group btn-group-block">
            <button
              class="btn btn-primary col-6 mr-1"
              :disabled="ButtonDisabled"
              @click.prevent="login"
              :class="{ loading: login_loading }"
            >
              <span class="">Prisijungti</span>
            </button>
            <button
              :disabled="ButtonDisabled"
              class="btn btn-primary col-6 ml-1"
              @click.prevent="tab = 'email'"
            >
              <span>Registruotis</span>
            </button>
          </div>
          <div class="forgot-password">
            <a @click="tab = 'forgot'" style="cursor: pointer"
              >Pamiršai slaptažodį?</a
            >
          </div>
        </form>
        <div class="b-divider">ARBA</div>
        <a class="btn btn-primary col-12 mb-1" :href="login_url + '/discord'">
          Prisijungti su<i class="pl-2 fa-brands fa-discord"></i>
        </a>
        <a class="btn btn-primary col-12 mb-1" :href="login_url + '/google'">
          Prisijungti su<i class="pl-2 fa-brands fa-google"></i>
        </a>
      </div>
      <EmailForm @register="register" v-if="tab === 'email'"></EmailForm>
      <ForgotPassword
        @changetab="tabChanger"
        :email="email"
        v-if="tab === 'forgot'"
      ></ForgotPassword>
      <OneTimePassword v-if="tab === 'onetimepassword'"></OneTimePassword>
    </div>
  </div>
</template>

<style>
body {
  height: 100% !important;
  width: 100% !important;
  background-color: #2c3e50 !important;
}
.ph::placeholder {
  opacity: 1;
  color: #818181;
}
</style>
