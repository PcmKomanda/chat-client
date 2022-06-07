<script>
import EmailValidator from "email-validator";
export default {
  data() {
    return {
      email: "",
      loading: false,
      focused: false,
    };
  },
  computed: {
    isEmailValid() {
      return EmailValidator.validate(this.email);
    },
  },
  methods: {
    submitRegister() {
      this.$emit("register", this.email);
      this.loading = true;
    },
  },
};
</script>

<template>
  <div class="box">
    <form action="">
      <label class="form-label" for="">Įveskite savo El. Paštą:</label>
      <input
        class="form-input ph col-12 mb-2"
        type="email"
        placeholder="El. Paštas"
        v-model="email"
        :class="{ 'is-danger': focused && !isEmailValid ? true : false }"
        @focus="focused = true"
      />
      <button
        class="btn btn-primary col-12"
        :disabled="!isEmailValid"
        @click.prevent="submitRegister()"
        :class="{ 'is-loading': loading }"
      >
        Baigti registraciją
      </button>
    </form>
  </div>
</template>

<style></style>
