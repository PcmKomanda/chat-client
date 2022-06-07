<script>
import api from "../api";
export default {
  data() {
    return {
      creds: "",
      loading: false,
      focused: false,
      message: "",
      error: "",
    };
  },
  computed: {},
  methods: {
    submitForgotPassword() {
      this.loading = true;
      this.error = "";
      api.get(`/auth/forgot?creds=${this.creds}`).then((r) => {
        if (r.data.error) {
          this.error = r.data.error;
          this.loading = false;
        } else {
          this.message = r.data.message;
          this.loading = false;
          setTimeout(() => {
            this.$emit("changetab", "onetimepassword");
          }, 5000);
        }
      });
    },
    changeTab(e) {
      this.$emit("changetab", "main");
    },
  },
};
</script>

<template>
  <div class="box">
    <div class="toast toast-error" v-if="error">
      <button class="btn btn-clear float-right"></button>
      {{ error }}
    </div>
    <div class="toast toast-primary" v-if="message">
      <button class="btn btn-clear float-right"></button>
      {{ message }}
    </div>
    <form action="">
      <label class="form-label" for=""
        >Įveskite savo El. Paštą arba slapyvardį:</label
      >
      <input
        class="form-input ph col-12 mr-2"
        type="text"
        placeholder="El. Paštas arba slapyvardis"
        v-model="creds"
        @focus="focused = true"
      />
      <div class="btn-group btn-group-block mt-2">
        <button
          class="btn btn-primary col-7"
          @click.prevent="submitForgotPassword()"
          :class="{ loading: loading }"
        >
          Gauti vienkartinį slaptažodį.
        </button>
        <button
          class="btn btn-primary col-5 ml-1"
          @click.prevent="changeTab('main')"
        >
          Grįžti
        </button>
      </div>
    </form>
  </div>
</template>

<style></style>
