<template>
  <div>
    <br><br>
    <h6>MyAppointments</h6>
    <router-link :to="chatPageRoute" class="btn btn-primary">Chat</router-link>
    <div v-for="appointment in appointments" :key="appointment.id" class="card">
      <p>{{ appointment.itemId }}</p>
      <h4 style="color: white;">{{ appointment.docId }}</h4>
      <h5>{{ appointment.date }}</h5>
      <h5>{{ appointment.time }}</h5>
      <div class="card-actions">
        <button class="btn" @click="openChat(appointment)">
          <i class="fas fa-comments"></i> Chat
        </button>
        <button class="btn btn-link" @click="viewPatientDetails(appointment)">
          <i class="fas fa-info-circle"></i> Patient Details
        </button>
        <button class="btn" v-if="!isPatientAdded(appointment)" @click="addPatient(appointment)">
          <i class="fas fa-plus"></i> Add Patient
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { getFirestore, doc, getDoc, updateDoc , arrayUnion} from 'firebase/firestore';

export default {
  name: 'MyAppointments',
  computed: {
    chatPageRoute() {
      const docId = this.$route.params.docId;
      return `/ChatPage/${docId}`;
    }
  },
  data() {
    return {
      appointments: [],
      addedPatients: []


    };
  },
  methods: {


    async addPatient(appointment) {
      try {

        const docId = this.$route.params.docId;

        const db = getFirestore();
        //const myPatient=collection(db,'MyPatient');
        const userDocRef = doc(db, 'Users', docId);
        const userDocSnapshot = await getDoc(userDocRef);

        const userData = userDocSnapshot.data();
        const myPatientDocRef = userData.mypatient;

        //const myPatientRef= await getDoc(myPatient,myPatientDocRef)
        await updateDoc(myPatientDocRef, {
          Patients: arrayUnion({docId:appointment.docId})
        }, { merge: true })
          .then(() => {
            console.log("success")
            this.addedPatients.push(appointment.docId);



          })

      } catch (error) {
        console.log(error)

      }
    },
    
    isPatientAdded(appointment) {
      // Check if the patient is already added
      return this.addedPatients.includes(appointment.docId);
    },
    
    async openChat(appointment) {
  try {
    const docId = this.$route.params.docId;
    const db = getFirestore();
    const userDocRef = doc(db, 'Users', docId);
    const userDocSnapshot = await getDoc(userDocRef);
    const userData = userDocSnapshot.data();
    const chatlistDocRef = userData.ChatList;
    const patientId = appointment.docId; // Assuming `patientId` is an entity in the ChatList collection documents

    if (patientId !== null) {
      await updateDoc(chatlistDocRef, {
        userId: appointment.docId
      }, { merge: true })
      .then(() => {
        console.log("success");
        this.$router.push({ name: 'MessagePage', params: { docId }, query: { userId: appointment.docId } });

      })
      .catch((error) => {
        console.error("Error updating chatlist document:", error);
      });
    } else {
      this.$router.push({ name: 'MessagePage', params: { docId }, query: { userId: appointment.docId } });
    }
  } catch (error) {
    console.error("Error opening chat:", error);
  }
},

    async fetchAppointments() {
      try {
        const docId = this.$route.params.docId;
        const db = getFirestore();
        const userDocRef = doc(db, 'Users', docId);
        const userDocSnapshot = await getDoc(userDocRef);
        const userData = userDocSnapshot.data();

        const appointmentRef = userData.appointment;


        const appointmentDocSnapshot = await getDoc(appointmentRef);
        const appointmentData = appointmentDocSnapshot.data();
        this.appointments = appointmentData.appointment;


      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    },
    startFetchingAppointments() {
      // Fetch appointments initially
      this.fetchAppointments();

      // Fetch appointments every 5 seconds
      setInterval(() => {
        this.fetchAppointments();
      }, 5000);
    },
  },
  created() {
    this.startFetchingAppointments();
  },
};
</script>
<style scoped>
.card{
  background-color: #ffffff;
  display: block;
  margin: auto;
  margin-bottom: 20px;
  width: 80%;
  padding: 20px;
  margin-left: 100px;
  border-bottom: 2px solid brown;
  border-right: 2px solid brown;
}
h4{
  background-color: rgb(144, 40, 40);
  color: white;
  border-radius: 10px;
}
h5{
  border-bottom: 1px solid brown;
}
.btn{
  background-color: rgb(222, 185, 185);
  border-bottom: 2px solid rgb(141, 30, 30);
  margin: 10px;

  color: white;
}
</style>
  