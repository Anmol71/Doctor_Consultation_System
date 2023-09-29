<template>
  <div class="container">
    <h1>Register</h1>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" v-model="password" required>
      </div>
      <div class="form-group">
        <label for="role">Role</label>
        <select class="form-control" id="role" v-model="role">
          <option value="doctor">Doctor</option>
          <option value="patient">Patient</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
  </div>
</template>
  
  
<script>
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc,  updateDoc } from "firebase/firestore";

export default {
  data() {
    return {
      email: "",
      password: "",
      role: "doctor", // Default role is "doctor"
    };
  },
  methods: {
    async register() {
      const auth = getAuth();
      const db = getFirestore();

      try {
        // Create user with email and password
        await createUserWithEmailAndPassword(auth, this.email, this.password);
        alert("Successfully registered");

        // Create a document in the "Users" collection with email and role
        const userCollection = collection(db, "Users");
        const userData = {
          email: this.email,
          role: this.role,
         
          
          

        };
        const userDocRef = await addDoc(userCollection, userData);
        const userDocId = userDocRef.id;
        console.log("User Document ID:", userDocId);
        // Create a document in the "appointment" collection
        const appointmentCollection = collection(db, "appointment");
        const appointmentData = {
          userId: userDocRef.id,
          appointment: [],
        };
        const appointmentDocRef = await addDoc(appointmentCollection, appointmentData);

        // Create a document in the "notification" collection
        const notificationCollection = collection(db, "notification");
        const notificationData = {
          userId: userDocRef.id,
          notification: [],
        };
        const notificationDocRef = await addDoc(notificationCollection, notificationData);

         // Create a document in the "ChatList" collection
         const ChatListCollection = collection(db, "ChatList");
        const ChatListData = {
          userId: userDocRef.id,
          ChatList:[]
          
        };
        const ChatListDocRef = await addDoc(ChatListCollection, ChatListData);


        // Create a document in the corresponding collection based on the role
        if(this.role==='patient'){
          const myDoctorCollection = collection(db, "MyDoctor");
        const myDoctorData = {
          userId: userDocRef.id,
          mydoctor: [],
        };
        const myDoctorDocRef = await addDoc(myDoctorCollection, myDoctorData);
        await updateDoc(userDocRef,{
          mydoctor:myDoctorDocRef
        })
        }else if(this.role==='doctor'){
          const myPatientCollection = collection(db, "MyPatient");
        const myPatientData = {
          userId: userDocRef.id,
          mypatient: [],
        };
        const myPatientDocRef = await addDoc(myPatientCollection, myPatientData);
        await updateDoc(userDocRef,{
          mypatient:myPatientDocRef
        })
        }


        if(this.role==='patient'){
          const UserDataCollection = collection(db, "UserData");
        const UserData = {
          userId: userDocRef.id,
          
        };
        const  UserRef = await addDoc( UserDataCollection, UserData);
        await updateDoc(userDocRef,{
          mydetails: UserRef
        })
        }else if(this.role==='doctor'){
          const DoctorsCollection = collection(db, "DoctorsData");
        const DoctorData = {
          userId: userDocRef.id,
          
        };
        const DoctorRef = await addDoc(DoctorsCollection,DoctorData);
        await updateDoc(userDocRef,{
          mydetails:DoctorRef
        })
        }


        // Update the user document with the references to appointment, notification, and myPatient/myDoctor documents
        await updateDoc(userDocRef, {
          appointment: appointmentDocRef,
          notification: notificationDocRef,
          ChatList: ChatListDocRef
          //mydoctor: myDoctorDocRef,
          //mypatient: myPatientDocRef
          //myPatient: myDoctorCollection.doc(userDocRef.id
          //myDoctor: myPatientCollection.doc(userDocRef.id),
        });
        

        // Sign in with registration and route to profile
        await signInWithEmailAndPassword(auth, this.email, this.password);
        alert("Successfully registered");

        if (this.role === "patient") {
          this.$router.push({ name: "PatientProfile", params: { docId: userDocRef.id } });
        } else if (this.role === "doctor") {
          this.$router.push({ name: "DoctorProfile", params: { docId: userDocRef.id } });
        } else {
          alert("Invalid role");
        }
      } catch (error) {
        console.error("Registration error:", error);
        alert("Error during registration");
      }
    },
  },
};
</script>
  
<style scoped>

.container{
  background-color: rgb(251, 234, 240);
  border-radius: 5px;
}
.container>h1{
  background-color: red;
  color: white;
  border-radius: 10px;
}
form>div{
  padding: 10px;
}
.button-group{
  display: flex;
  justify-content: space-evenly;
}
</style>