<script>
import api from "../api";
export default {
  props: {
    user: Object,
    online: Number,
  },
  data() {
    return {
      token: "",
    };
  },
  methods: {
    logout() {
      this.token = this.$cookies.get("auth-token");
      this.$cookies.remove("auth-token");
      this.$socket.emit("disconnect");
      api.post(`/auth/revoke?token=${this.token}`);
      location.reload();
    },
    open_profile() {
      this.$emit("edit_profile");
    },
    async giveMod(status) {
      await api.post(`/users/${this.user._id}/${status}`).then((r) => {
        this.$socket.emit("update_user", { id: this.user._id });
        this.$socket.emit("update_messages_for_everyone");
      });
      // location.reload();
    },
    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<template>
  <header class="navbar p-2">
    <section class="col-2" :class="{ 'navbar-section': !isMobile() }">
      <span class="online">Prisijungę: {{ online }}</span>
    </section>
    <section class="navbar-section col-10">
      <div class="pr-2 clickable" v-if="user.admin">
        <span v-if="user.mod" @click="giveMod('demote')">Mod</span>
        <span v-else @click="giveMod('promote')">User</span>
      </div>
      <div class="d-flex-inline">
        <img
          :src="user.avatar"
          class="avatar"
          :class="{ 'avatar-lg': !isMobile(), 'avatar-sm': isMobile() }"
        />
        <span class="m-2 mt-3" :class="{ 'text-gold': user.mod }">{{
          user.display_name
        }}</span>
        <a @click="logout" class="nav-icon mt-3 mr-2">
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
        </a>
      </div>
    </section>
  </header>
</template>

<style>
.navbar,
.nav {
  display: flex;
}
.navbar-item {
  color: white;
}
.nav-icon {
  color: white;
  text-decoration: none;
}
.nav-icon:hover {
  transition: 1s;
  color: #00ccff;
}
.text-gold {
  color: gold;
}
.clickable {
  cursor: pointer;
}
.online {
  white-space: nowrap;
  margin: auto;
}
</style>
