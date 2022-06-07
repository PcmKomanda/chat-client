<script>
import api from "../api";
export default {
  data() {
    return {
      loading: false,
      pass: "",
      tab: "main",
      new_pass: "",
      confirm_pass: "",
      token: "",
      error: "",
      message: "",
    };
  },
  computed: {},
  methods: {
    login() {
      this.loading = true;
      api.get(`/auth/forgot/otplogin?otp=${this.pass}`).then((r) => {
        this.$cookies.set("auth-token", r.data.token);
        this.token = r.data.token;
        this.tab = "change";
        this.loading = false;
      });
    },
    change_pass() {
      this.loading = true;
      api
        .post(
          `/auth/forgot/change?token=${
            this.token || this.$cookies.get("auth-token")
          }`,
          {
            new_pass: this.new_pass,
          }
        )
        .then((r) => {
          if (r.data.error) {
            this.error = r.data.error;
            return;
          }
          this.message = r.data.message;
          this.loading = false;
          location.reload();
        });
    },
  },
};
</script>

<template>
  <div class="box">
    <form v-if="tab == 'main'">
      <label class="form-label"> Įveskite gautą vienkartinį slaptažodį: </label>
      <input
        class="form-input ph col-12 mb-2"
        type="text"
        placeholder="Slaptažodis"
        v-model="pass"
      />
      <button class="btn btn-primary col-12" @click.prevent="login">
        Prisijungti
      </button>
    </form>
    <form v-if="tab == 'change'">
      <div class="toast toast-error mb-2" v-if="error">
        <button
          class="btn btn-clear float-right"
          @click.prevent="error = ''"
          :class="{ loading: loading }"
        ></button>
        {{ error }}
      </div>
      <div class="toast toast-success mb-2" v-if="message">
        <button
          class="btn btn-clear float-right"
          @click.prevent="message = ''"
        ></button>
        {{ message }}
      </div>
      <label class="form-label"> Įveskite naują slaptažodį. </label>
      <input
        class="form-input ph col-12"
        type="password"
        placeholder="Naujas slaptažodis"
        v-model="new_pass"
      />
      <label class="form-label"> Pakartokite naują slaptažodį. </label>
      <input
        class="form-input ph col-12 mb-2"
        type="password"
        placeholder="Pakartokite slaptažodį"
        v-model="confirm_pass"
      />
      <button
        class="btn btn-primary col-12"
        @click.prevent="change_pass"
        :disabled="new_pass !== confirm_pass || new_pass.length < 6"
        :class="{ loading: loading }"
      >
        Pakeisti slaptažodį.
      </button>
    </form>
  </div>
</template>

<style></style>
