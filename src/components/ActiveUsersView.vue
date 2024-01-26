<template>
  <q-page-sticky position="top" expand class="tabs-zindex">
    <q-tabs
      v-model="selectedUid"
      inline-label
      outside-arrows
      mobile-arrows
      class="bg-primary text-white shadow-2 full-width"
    >
      <q-tab
        v-for="user in getUsersWithoutUser"
        :key="user.uid"
        :name="user.uid"
        icon="account_circle"
        :label="user.email"
        :class="user.status ? 'text-white' : 'text-grey'"
      />
    </q-tabs>
  </q-page-sticky>
</template>

<script>
import { ref, computed, inject } from "vue";
import { auth, db } from "boot/firebase";
import { useAuth } from "@vueuse/firebase";

export default {
  setup() {
    const selectedUid = inject("selectedUid");
    const users = ref([]);
    const { user } = useAuth(auth);

    db.collection("users").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("New user: ", change.doc.data());
          users.value = [...users.value, change.doc.data()];
          users.value = users.value.sort((a, b) => b.status - a.status);
        }
        if (change.type === "modified") {
          console.log("Modified user: ", change.doc.data());
          users.value = users.value.map((user) =>
            user.uid === change.doc.data().uid
              ? { ...user, status: change.doc.data().status }
              : user
          );
          users.value = users.value.sort((a, b) => b.status - a.status);
        }
        if (change.type === "removed") {
          console.log("Removed user: ", change.doc.data());
        }
      });
    });

    const getUsersWithoutUser = computed(() => {
      return users.value.filter((i) => i.uid !== user.value.uid);
    });

    return {
      selectedUid,
      getUsersWithoutUser,
    };
  },
};
</script>

<style scoped>
.tabs-zindex {
  z-index: 2000;
}
</style>
