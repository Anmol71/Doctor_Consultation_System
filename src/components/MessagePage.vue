<template>
  <div>
    <div>

    </div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-4 offset-md-4">
          <div class="card">
            <div class="card-header">
              Messaging
            </div>
            <div class="card-body">
              <p> Receiver ID: {{ userId }}</p>

              <div class="chat-container">
                <!-- <div v-for="message in messages" :key="message.id" class="message-container">
                                  <div class="message-content"
                                      :class="{ 'sent': message.sent, 'received': !message.sent }">
                                      {{ message.text }}
                                  </div>
                              </div> -->
                <div v-for="message in this.mergedArray" :key="message.id" class="message-container">
                  <div class="message-content" :class="{ 'sent': message.user === 1, 'other-user': message.user !== 1 }">
                    {{ message.text }}
                  </div>
                </div>
              </div>

              <form @submit.prevent="sendMessage">
                <div class="form-group">
                  <label for="message">Message</label>
                  <textarea class="form-control" v-model="newMessage" id="message" rows="3"></textarea>
                </div>
                <button class="btn btn-primary" type="submit">Send</button>
              </form>
              <div>
                <input type="file" @change="handleFileChange" />
                <button @click="uploadFile">Upload File</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import { getDatabase, push, ref, onChildAdded, query, orderByChild, limitToLast } from "firebase/database";
import { getStorage, ref as Ref, uploadBytes } from "firebase/storage";
export default {
  data() {
    return {
      selectedFile: null,
      userId: null,
      messages: [],
      messagesSent: [],
      newMessage: '',
      mergedArray: [],
    };
  },
  mounted() {
    // Retrieve patientId from query parameter
    this.userId = this.$route.query.userId;

    const db = getDatabase();

    const docId = this.$route.params.docId;
    const chatRef = ref(db, `Chat/${docId}`);

    const queryRef = query(chatRef, orderByChild("timestamp"), limitToLast(10));

    onChildAdded(queryRef, (snapshot) => {
      const message = snapshot.val();
      const messageText = message.text;
      const messageId = message.id;
      const messageTime = message.timestamp;
      this.mergedArray.push({ id: messageId, text: messageText, timestamp: messageTime, user: 1 });



    });
    console.log(this.mergedArray);

    const userId = this.$route.query.userId;
    const chatRefSent = ref(db, `Chat/${userId}`);
    const queryRefSent = query(chatRefSent, orderByChild("timestamp"), limitToLast(10));
    // Retrieve the messages from the Realtime Database
    onChildAdded(queryRefSent, (snapshot) => {
      const message = snapshot.val();
      const messageText = message.text;
      const messageId = message.id;
      const messageTime = message.timestamp;
      this.mergedArray.push({ id: messageId, text: messageText, timestamp: messageTime, user: 2 });


    });
    console.log(this.mergedArray);
    //  this.mergedArray = this.messages.concat(this.messagesSent);
    //  console.log(this.mergedArray);
    this.sortArrayByTimestamp();
    // console.log(this.mergedArray);
  },


  methods: {
    sortArrayByTimestamp() {
      this.mergedArray.sort((a, b) => {
        const timestampA = new Date(a.timestamp.replace(/,/g, ''));
        const timestampB = new Date(b.timestamp.replace(/,/g, ''));
        return timestampA - timestampB;
      });
      console.log(this.mergedArray);
    },
    sendMessage() {
      if (this.newMessage.trim() !== '') {

        const docId = this.$route.params.docId;
        const id = new Date().getTime();
        const message = {
          id,
          text: this.newMessage.trim(),
          sent: true,
          timestamp: new Date().toLocaleString(), // Add timestamp
          senderId: docId
        };


        // Send message to the Realtime Database
        const userId = this.$route.query.userId
        const db = getDatabase()
        const chatRef = ref(db, 'Chat/' + userId);


        push(chatRef, message); // Save the updated array back to the Realtime Database




        this.messages.push(message);
        this.newMessage = '';
      }
    },
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    async uploadFile() {
      if (!this.selectedFile) {
        return;
      }

      try {
        const storageRef = getStorage();
        const attachmentPath = 'Attachment/' + this.selectedFile.name;

        const attachmentRef = Ref(storageRef, attachmentPath);

        await uploadBytes(attachmentRef, this.selectedFile);

        console.log('File uploaded successfully');

        // After uploading the file, send the file path as a message
        const docId = this.$route.params.docId;
        const id = new Date().getTime();
        const message = {
          id,
          text: attachmentPath,
          sent: true,
          timestamp: new Date().toLocaleString(),
          senderId: docId
        };

        const userId = this.$route.query.userId;
        const db = getDatabase();
        const chatRef = ref(db, 'Chat/' + userId);

        push(chatRef, message);

        // Update the messages array for display
        this.mergedArray.push({
          id,
          text: attachmentPath,
          timestamp: new Date().toLocaleString(),
          user: 1
        });

      } catch (error) {
        console.error('Error uploading file:', error);
      }
    
    },
  }
};
</script>

<style scoped>
/* CSS styles specific to this component */




.chat-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 10px;
}

.message-container {
  display: flex;

  width: 100%;
}

.message-content {
  background-color: #4CAF50;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  max-width: 70%;
  display: flex;
  flex-direction: column-reverse;

}

/* 
.message-content.sent {

  background-color: #4CAF50;
  align-self: flex-start;
} */



/* .message-content.received {
  align-self: flex-end;
  background-color: #f1f0f0;
  color: black;
} */


.form-group {
  margin-bottom: 0;
}

.sent {
  background-color: green;

}

.other-user {
  background-color: brown;
  margin-left: 80%;


}
</style>
