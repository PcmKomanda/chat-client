<script>
import Messages from "./Messages.vue";
import Sender from "./Sender.vue";
export default {
  props: {
    user: Object,
    room_id: String,
  },
  components: { Messages, Sender },
};
</script>

<template>
  <div class="col-12">
    <div class="">
      <Messages ref="messages" :user="user"></Messages>
      <Sender class="sender" :user="user"></Sender>
    </div>
    <!-- <div class="sender col-10 col-sm-12 p-absolute"></div> -->
  </div>
</template>

<style lang="scss">
html,
body {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  right: 0;
}
.messages {
  right: 0;
  min-height: calc(100% - (128px * 1.5));
  max-height: calc(100% - (128px * 1.5));
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
  position: fixed;
}
.sender {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 128px;
  width: 100%;
  overflow: auto;
}

@media (max-width: 768px) {
  .messages {
    min-height: calc(100% - (105px * 1.4));
    max-height: calc(100% - (105px * 1.4));
  }
  .sender {
    height: 100px;
  }
  .sender::-webkit-scrollbar {
    width: 0px;
  }
}

::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
