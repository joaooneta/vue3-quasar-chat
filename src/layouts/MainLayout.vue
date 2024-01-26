<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>{{
          isAuthenticated ? user.email : "Chat"
        }}</q-toolbar-title>

        <div>
          <q-btn color="negative" v-if="isAuthenticated" @click="logout"
            >Logout</q-btn
          >
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { auth, db } from "boot/firebase";
import { useAuth } from "@vueuse/firebase";
export default {
  name: "MainLayout",

  components: {},

  setup() {
    const { isAuthenticated, user } = useAuth(auth);

    const logout = async () => {
      try {
        await db.collection("users").doc(user.value.uid).update({
          status: false,
        });
        await auth.signOut();
      } catch (error) {
        console.log(error);
      }
    };
    return {
      isAuthenticated,
      user,
      logout,
    };
  },
};
</script>
