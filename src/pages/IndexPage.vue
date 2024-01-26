<template>
  <q-page padding>
    <AccessView v-if="!isAuthenticated"></AccessView>
    <div v-else>
      <ActiveUsersView></ActiveUsersView>
      <ChatView></ChatView>
    </div>
  </q-page>
</template>

<script>
import AccessView from "../components/AcessView.vue";
import ActiveUsersView from "../components/ActiveUsersView.vue";
import ChatView from "../components/ChatView.vue";
import { auth } from "boot/firebase";
import { useAuth } from "@vueuse/firebase";
import { provide, ref } from "vue";
export default {
  components: { AccessView, ActiveUsersView, ChatView },
  setup() {
    const { isAuthenticated, user } = useAuth(auth);

    const selectedUid = ref("");
    provide("selectedUid", selectedUid);

    return {
      isAuthenticated,
    };
  },
};
</script>
