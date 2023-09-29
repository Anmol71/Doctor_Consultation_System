<template>
  <div>
    <h1>BookingPage</h1>
    <div v-if="selectedData" class="card">
      <p>Text</p>
      <h4>Book to: <h5>{{ selectedData.id }}</h5></h4>
      <h4>From: <h5>{{ $route.params.docId }}</h5></h4>
      <input type="date" v-model="selectedDate" />
      <input type="time" v-model="selectedTime" />
      <button @click="submitBooking">Submit</button>
    </div>
    <div v-else>
      <p>No data selected</p>
    </div>
  </div>
</template>

<script>
import { getFirestore, getDoc, doc, arrayUnion, updateDoc } from 'firebase/firestore';

export default {
  name: 'BookingPage',
  props: ['selectedData'],
  data() {
    return {
      selectedDate: '',
      selectedTime: '',
    };
  },
  methods: {
    async submitBooking() {
      // Check if selectedData is null
      if (!this.selectedData) {
        console.error('No data selected');
        return;
      }

      const itemId = this.selectedData.id;
      const paramsId = this.$route.params.docId;

      // Fetch the UsersId value from the doctorsData collection
      const db = getFirestore();
      const doctorsDataRef = doc(db, 'DoctorsData', itemId);
      const doctorsDataSnapshot = await getDoc(doctorsDataRef);
      const usersId = doctorsDataSnapshot.data().userId;

      // Search the Users collection for the matching docId
      const usersRef = doc(db, 'Users', usersId);
      const usersSnapshot = await getDoc(usersRef);
      const usersData = usersSnapshot.data();

      if (usersData) {
        // Retrieve the appointmentRef from the Users document
        let appointmentRef = usersData.appointment;

        if (!appointmentRef) {
          // If appointmentRef doesn't exist, create it as an empty array
          appointmentRef = [];
        }

        // Update or merge the data in the Users document
        await updateDoc(appointmentRef, {
          appointment: arrayUnion({
            itemId,
            docId: paramsId,
            date: this.selectedDate,
            time: this.selectedTime,
          }),
        },{merge:true});

        console.log('Selected Data:', this.selectedData);
        console.log('itemId:', itemId);
        console.log('paramsId:', paramsId);
        console.log('usersId:', usersId);
        console.log('appointmentRef:', appointmentRef);
      } else {
        console.error('Invalid usersData');
      }
    },
  },
};
</script>
