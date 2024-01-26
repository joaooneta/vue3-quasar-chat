<template>
  <div v-if="selectedUid !== ''" class="q-mt-xl" ref="RefChat">
    <div class="q-pa-md row justify-center">
      <div style="width: 100%; max-width: 600px">
        <q-chat-message
          v-for="chat in chats"
          :key="chat.id"
          :name="chat.user"
          :text="[chat.text]"
          :sent="chat.uid === user.uid"
        />
      </div>
    </div>
    <q-footer>
      <q-form @submit.prevent="sendMessage">
        <q-toolbar class="bg-primary text-white row">
          <q-input
            rounded
            outlined
            dense
            class="col-grow q-mr-sm"
            bg-color="white"
            v-model="message"
            placeholder="Type a message"
          />
          <q-btn round flat icon="send" type="submit" /> </q-toolbar
      ></q-form>
    </q-footer>
  </div>
  <div v-else class="q-mt-xl">
    <h5>Select a user to send a message</h5>
  </div>
</template>

<script>
import { ref, inject, watch } from "vue";
import { auth, timeStamp, db } from "boot/firebase";
import { useAuth } from "@vueuse/firebase";
export default {
  setup() {
    const message = ref("");
    const selectedUid = inject("selectedUid");
    const { user } = useAuth(auth);
    const chats = ref([]);
    const RefChat = ref(null);

    let unsubscribe;

    const getData = (selectedUserUid) => {
      chats.value = [];
      unsubscribe = db
        .collection("chat")
        .doc(user.value.uid)
        .collection(selectedUserUid)
        .orderBy("date")
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              console.log("New user: ", change.doc.data());
              chats.value.push({ ...change.doc.data(), id: change.doc.id });
            }

            if (RefChat.value !== null) {
              setTimeout(() => {
                window.scrollTo(0, RefChat.value.scrollHeight);
              }, 50);
            }
          });
        });
    };

    watch(
      () => selectedUid.value,
      (newUid) => {
        if (unsubscribe) {
          unsubscribe();
          if (newUid) {
            getData(newUid);
          }
        } else {
          getData(newUid);
        }
      }
    );

    const sendMessage = async () => {
      if (!message.value.trim()) return;

      try {
        const messageObj = {
          user: user.value.email,
          text: message.value,
          date: timeStamp(),
          uid: user.value.uid,
        };

        /*OBS: promise all*/
        await db
          .collection("chat")
          .doc(user.value.uid)
          .collection(selectedUid.value)
          .add(messageObj);

        await db
          .collection("chat")
          .doc(selectedUid.value)
          .collection(user.value.uid)
          .add(messageObj);

        message.value = "";
      } catch (error) {
        console.log(error);
      }
    };
    return {
      message,
      sendMessage,
      selectedUid,
      chats,
      user,
      RefChat,
    };
  },
};
</script>
