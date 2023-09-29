<template>
  <div>
    <h6>MyPatient</h6>

    <div v-for="Patients in patientList" :key="Patients.id" class="card">
      <div class="class">
        <h1>{{ Patients.docId}}</h1>
      </div>
    </div>

  </div>
</template>

<script>
import { doc, getDoc, getFirestore } from 'firebase/firestore';

export default {
  name: 'MyPatient',
  data() {
    return {
      patientList: [],
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

        const myPatientRef = userData.mypatient;
        
        const patientDocSanpshot = await getDoc(myPatientRef);
        const patientListData=patientDocSanpshot.data();
        this.patientList= patientListData.Patients
       
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
