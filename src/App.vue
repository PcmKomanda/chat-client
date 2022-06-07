<script>
import api from "./api";
import Auth from "./components/Auth.vue";
import Dashboard from "./components/Dashboard.vue";
export default {
  data() {
    return {
      peopleOnline: 0,
      user: {},
    };
  },
  sockets: {
    online(data) {
      this.peopleOnline = data.online;
    },
    auth(data) {
      this.user = JSON.parse(data);
    },
    join(data) {
      if (data.user) {
        console.log("Logged on!");
      } else {
        console.log("Please login!");
      }
    },
  },
  async mounted() {
    const cookie = this.$cookies.get("auth-token");
    const token = location.href.split("token=")[1];
    if (cookie) {
      const isValid = await api
        .get(`/auth/check?token=${cookie}`)
        .then((r) => r.data.valid);
      if (!isValid) {
        this.$cookies.remove("auth-token");
        console.log("Cookie invalidated!");
        location.reload();
      }
      this.$socket.emit("auth", JSON.stringify(cookie));
    } else {
      const token = location.href.split("token=")[1];
      if (!token) return;
      const isValid = api
        .get(`/auth/check?token=${token}}`)
        .then((r) => r.data.valid);
      if (!isValid) return;
      this.$cookies.set("auth-token", token);
      this.$socket.emit("auth", JSON.stringify(token));
      location.href = "/";
    }
    if (token) location.href = "/";
  },
  components: {
    Dashboard,
    Auth,
  },
};
</script>

<template class="is-danger">
  <div v-if="user._id">
    <Dashboard :user="user" :online="peopleOnline" />
  </div>
  <div v-else class="auth">
    <Auth @authed="setUser"></Auth>
  </div>
</template>

<style>
html {
  overflow: hidden;
  background-color: #2c3e50 !important;
}
* {
  box-sizing: border-box !important;
}
.navbar {
  background-color: #253342;
  color: white !important;
}
.auth {
  padding-top: 25vh;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  background-color: #2c3e50 !important;
  color: #fff;
}
</style>
