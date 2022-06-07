<script>
export default {
  props: {
    user: Object,
    room_id: String,
  },
  data() {
    return {
      message: ``,
      room: {},
    };
  },
  methods: {
    sendMessage() {
      this.$socket.emit("send_message", {
        author: this.user,
        content: this.message,
      });
      this.message = ``;
    },
  },
};
</script>

<template>
  <div class="">
    <textarea
      class="form-input textarea col-12"
      placeholder="Tekstas..."
      v-model="message"
    ></textarea>
    <button
      class="btn send btn-primary col-12"
      @click="sendMessage"
      :disabled="message.length < 2"
    >
      Siųsti
    </button>
  </div>
</template>

<style>
.textarea {
  resize: none;
  min-height: 9vh !important;
}
.btn.send {
  opacity: 1;
}
</style>
