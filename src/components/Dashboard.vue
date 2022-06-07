<script>
import Messenger from "./Messenger.vue";
import NavBar from "./Nav.vue";

export default {
  props: {
    msg: String,
    online: Number,
    user: Object,
  },
  data() {
    return {
      count: 0,
      is_mobile: true,
    };
  },
  components: {
    NavBar,
    Messenger,
  },
};
</script>

<template>
  <NavBar :user="user" :online="online"></NavBar>
  <div class="columns dash">
    <div class="column p-0 col-12 col-sm-12">
      <Messenger :user="user"></Messenger>
    </div>
  </div>
</template>

<style scoped>
/* dash {
  max-width: 100%;
  min-width: 100%;
} */
a {
  color: #42b983;
}
.sidebar {
  background-color: #115ca1;
  min-height: 96vh;
}
</style>
