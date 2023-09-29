<template>
  <div>
    <h1>Create Key</h1>
    <button @click="createKey">Create New Key</button>
  </div>
</template>

<script>
import { getDatabase, ref, push, set } from 'firebase/database';

export default {
  name: 'CreateKey',
  methods: {
    createKey() {
      const db = getDatabase();

// Create a new unique key for the notification
const newNotificationRef = push(ref(db, 'notification'));

// Set the data for the new notification
const notificationData = {
  title: 'New Notification',
  message: 'This is a sample notification.',
};

// Write the data to the new notification key
set(newNotificationRef, notificationData)
  .then(() => {
    console.log('Notification created successfully!');

    // Get the user's ID (assuming you have it)
    const userId = '5Jq95DfJxwAVgr0AhM0q';

    // Add the notification key to the user's document
    const userRef = ref(db, `Users/${userId}/notifications`);
    set(userRef, { [newNotificationRef.key]: true })
      .then(() => {
        console.log('Notification key added to user successfully!');
      })
      .catch((error) => {
        console.error('Error adding notification key to user:', error);
      });
  })
  .catch((error) => {
    console.error('Error creating notification:', error);
  });
    }
  }
}


</script>
