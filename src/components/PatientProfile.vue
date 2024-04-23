<template>
  <div class="container">
    <br>
    <h2>Patient Profile</h2>
    <br>
    
    <form @submit.prevent="submitForm">
      <div>
        <input type="file" @change="handleFileChange" />
      </div>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" v-model="name" required>
      </div>
      <div class="form-group">
        <label for="gender">Gender</label>
        <select class="form-control" id="gender" v-model="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div class="form-group">
        <label for="dob">Date of Birth</label>
        <input type="date" class="form-control" id="dob" v-model="dob" required>
      </div>
      <div class="form-group">
        <label for="mobile">Mobile</label>
        <input type="number" class="form-control" id="mobile" v-model="mobile" required>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>
  
<script>
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from 'firebase/storage';

export default {
  data() {
    return {
      selectedFile: null,
      name: "",
      gender:"",
      dob: "",
      mobile: "",
    };
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
   
   
       
  
    submitForm() {
      const db = getFirestore();
      const userDataCollection = collection(db, "UserData");

      const userData = {
        name: this.name,
        gender: this.gender,
        dob: this.dob,
        mobile: this.mobile,
        userId: this.$route.params.docId, // Use the route parameter docId as userId
        ProfileImg: this.selectedFile.name
      };


      const storageRef = getStorage();
      const profilePictureRef = ref(storageRef, 'Profile Pictures/' + this.selectedFile.name);

     
      uploadBytes(profilePictureRef, this.selectedFile).then(()=>{
        alert("image is set")
      }).catch((error)=>{
        alert("error in image uploading",error)
      })
    
      

      addDoc(userDataCollection, userData)
        .then(() => {
          alert("Data submitted successfully");
        })
        .catch((error) => {
          console.error("Error submitting data:", error);
          alert("Error submitting data");
        });
      
  },
},
};
</script>
<style scoped>
.form-group {
  width: 80%;
  display: block;
  margin: auto;
}

.btn {
  margin-top: 70px;
}

h2 {
  color: brown;
}
</style>