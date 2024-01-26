<template>
  <div class="q-px-xl">
    <h5>{{ acess ? "Login" : "Register" }} Form</h5>
    <q-form class="q-gutter-md" @submit.prevent="handleForm">
      <q-input label="Email" v-model="email" />
      <q-input label="Password" v-model="password"></q-input>
      <q-btn :label="acess ? 'Login' : 'Register'" type="submit"></q-btn>
      <q-btn color="primary" outline v-if="!acess" @click="acess = true"
        >Already a member?</q-btn
      >
      <q-btn color="negative" outline v-if="acess" @click="acess = false"
        >Not a member?</q-btn
      >
    </q-form>
  </div>
</template>

<script>
import { ref } from "vue";
import { auth, db } from "boot/firebase";
import { useAuth } from "@vueuse/firebase";
export default {
  setup() {
    const email = ref("teste@teste.com");
    const password = ref("123456");
    const acess = ref(true);

    const { isAuthenticated, user } = useAuth(auth);

    const handleForm = async () => {
      if (!email.value.trim() || !password.value.trim()) {
        console.log("Empty inputs!");
        return;
      }

      try {
        if (!acess.value) {
          const res = await auth.createUserWithEmailAndPassword(
            email.value,
            password.value
          );

          await db.collection("users").doc(res.user.uid).set({
            email: res.user.email,
            status: true,
            uid: res.user.uid,
          });
        } else {
          const res = await auth.signInWithEmailAndPassword(
            email.value,
            password.value
          );

          await db.collection("users").doc(res.user.uid).update({
            status: true,
          });
        }

        email.value = "";
        password.value = "";
      } catch (error) {
        console.log(error);
      }
    };

    return {
      email,
      password,
      handleForm,
      acess,
      isAuthenticated,
      user,
    };
  },
};
</script>
