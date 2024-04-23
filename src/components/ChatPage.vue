<template>
    <div>
      <h6>MyPatient</h6>
  
      <div v-for="patient in ChatList" :key="patient.id" class="card">
        <div class="class">
          <h1>{{ patient.userId }}</h1>
        </div>
      </div>
  
    </div>
  </template>
  
  <script>
  import { doc, getDoc, getFirestore } from 'firebase/firestore';
  
  export default {
    name: 'ChatPage',
    data() {
      return {
        ChatList: [],
      };
    },
    methods: {
      async getdata() {
        try {
          const docId = this.$route.params.docId;
          const db = getFirestore();
          const userDocRef = doc(db, 'Users', docId);
          const userDocSnapshot = await getDoc(userDocRef);
          const userData = userDocSnapshot.data();
  
          const ChatListRef = userData.chatlist;
          
          if (Array.isArray(ChatListRef)) {
            // mypatient is an array of document references
            const promises = ChatListRef.map(async (ref) => {
              const ChatListDoc = await getDoc(ref);
              return ChatListDoc.data();
            });
            this.ChatList = await Promise.all(promises);
          } else {
            // mypatient is a single document reference
            const ChatListDoc = await getDoc(ChatListRef);
            this.patientList = [ChatListDoc.data()];
          }
        } catch (error) {
          console.error('Error retrieving Users document:', error);
        }
      },
    },
    created() {
      this.getdata();
    },
  };
  </script>
  