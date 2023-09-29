<template>
  <div class="container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" v-model="password" required>
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
      <router-link to="/register" class="btn btn-primary">Register</router-link>
    </form>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";


export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      const auth = getAuth()
      const db = getFirestore();
      const dataCollection = collection(db, "Users");
      const logic = where("email", "==", this.email);

      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          // Search for the user's email in the Users collection
          const userQuery = query(dataCollection, logic);
          getDocs(userQuery)
            .then((querySnapshot) => {
              if (querySnapshot.size > 0) {
                const doc = querySnapshot.docs[0];
                const docId = doc.id;
                const role = doc.data().role;
                if (role === "patient") {
                  this.$router.push({ name: 'PatientDashboard', params: { docId } });
                } else if (role === "doctor") {
                  this.$router.push({ name: 'DoctorDashboard', params: { docId } });
                }
              } else {
                alert("User not found");
              }
            })
            .catch((error) => {
              alert(error.message);
            });
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }
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