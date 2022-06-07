<script>
export default {
  props: {
    user: Object,
  },
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    scrollToEnd() {
      this.$refs.messages.scrollTop =
        this.$refs.messages.lastElementChild.offsetTop;
    },
    requestMessages() {
      this.$socket.emit("getMessages");
    },
    deleteMessage(id) {
      if (confirm("Ar tikrai norite ištrinti?")) {
        this.$socket.emit("deleteMessage", id);
      }
    },
  },
  sockets: {
    messages(data) {
      this.messages = data;
    },
  },
  updated() {
    // whenever data changes and the component re-renders, this is called.
    this.$nextTick(() => this.scrollToEnd());
  },
  async mounted() {
    this.requestMessages();
  },
};
</script>

<template>
  <div class="messages" ref="messages">
    <div v-for="message in messages" :key="message" class="mt-2 mb-2">
      <div
        class="columns message pb-1 pt-1"
        :class="{ 'your-message': user._id == message?.author?._id }"
      >
        <div class="column text-center pfp">
          <img :src="message?.author?.avatar" class="avatar avatar-lg" />
        </div>
        <div class="column">
          <div class="info">
            <b>
              <span :class="{ 'text-gold': message?.author?.mod }">
                {{ message?.author?.display_name }}
              </span>
              |
              {{
                this.$moment(message?.createdAt).format("YYYY-MM-DD HH:mm:ss")
              }}
            </b>
            <i
              v-if="message?.author?._id === user._id || user.mod"
              class="fa-solid fa-circle-xmark float-right text-error pt-1 delete"
              @click="deleteMessage(message._id)"
            ></i>
          </div>
          <pre class="content" v-html="message?.content"></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.message {
  background-color: #190aa1;
  margin: auto;
  border-radius: 15px;
  width: 98%;
}

.your-message {
  background-color: #295bb6;
}
.content h1,
h2,
h3,
h4,
h5,
h6,
p,
span,
pre {
  margin: 0 !important;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
.content {
  white-space: pre-wrap;
  word-break: break-all;
}
.info {
  color: rgba(255, 255, 255, 0.822);
  font-size: 14px;
}
.pfp {
  max-width: 60px;
  margin: auto;
}
.delete {
  cursor: pointer;
}
</style>
