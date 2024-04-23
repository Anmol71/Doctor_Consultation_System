<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <nav class="nav flex-column">
          <a class="nav-link active" aria-current="page">
            <router-link :to="Home" ><h3 class="item">DashBoard</h3></router-link>
          </a>
          <router-link class="item"  :to="profileRoute">Profile</router-link>
          <router-link class="item" v-if="role === 'patient'" :to="myPageRoute">My Doctor</router-link>
          <router-link class="item" v-if="role === 'doctor'" :to="myPageRoute">My Patient</router-link>
          <router-link class="item" v-if="role === 'doctor'" :to="myAppointment">My Appointments</router-link>

          <a class="item" href="#">Link</a>
          <!-- <a class="nav-link disabled">Disabled</a> -->
        </nav>
      </div>
      <div class="col">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
//import MyAppointments from './MyAppointments.vue';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

export default {
  name: 'DashBoard',

  data() {
    return {
      role: '',
      profileRoute: '', // Holds the profile route path
      docId: '', // Holds the docId
      myPageRoute: '', // Holds the My Doctor route path
      // Holds the My Patient route path
      myAppointment: '',
      Home:''
    };
  },

  created() {
    
    this.docId = this.$route.params.docId;
    const db = getFirestore();
    const usersCollection = collection(db, 'Users');
    const usersQuery = query(usersCollection, where('__name__', '==', this.docId));
    getDocs(usersQuery).then((snapshot) => {
      if (!snapshot.empty) {
        const userDoc = snapshot.docs[0];
        this.role = userDoc.data().role;
        // Assign the correct profile and route paths based on the user's role
        if (this.role === 'patient') {
          this.profileRoute = { name: 'PatientProfile', params: { docId: this.docId } };
          this.myPageRoute = { name: 'MyDoctor', params: { docId: this.docId } };
          this.Home={name:'PatientDashboard',params:{ docId: this.docId }}
        } else if (this.role === 'doctor') {
          this.myAppointment = { name: 'MyAppointments', params: { docId: this.docId } };
          this.profileRoute = { name: 'DoctorProfile', params: { docId: this.docId } };
          this.myPageRoute = { name: 'MyPatient', params: { docId: this.docId } };
          this.Home={name:'DoctorDashboard',params:{ docId: this.docId }}
        } else {
          this.myAppointment = '/not-found';
          this.profileRoute = '/not-found';
          this.myPageRoute = '/not-found';
        }
      }
    }).catch((error) => {
      console.error('Error fetching user data:', error);
    });
  },


};
</script>
<style scoped>
/* Reset default margin and padding */
html, body {
  margin: 0;
  padding: 0;
}

nav{
  height: 100%;
  padding: 50px;
  width: 300px;
  background-color: rgb(134, 15, 15);
}
.item{
  padding-top: 30px;
  padding-bottom: 30px;
  text-decoration: none;
  border-bottom: 1px solid white;
  color: white;
}
.item:hover{
  background-color: rgb(115, 19, 19);
  border-radius: 30px;
}
.container{
  background-color: rgb(222, 190, 190);
  /* padding: 100px; */

}

/* Optional: Style for router-view content */
/* .col > * {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
} */

</style>