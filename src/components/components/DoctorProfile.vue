<template>
    <div class="container">
      <br>
      <h2>Doctor Profile</h2>
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
          <label for="qualification">Qualification</label>
          <input type="text" class="form-control" id="qualification" v-model="qualification" required>
        </div>
        <div class="form-group">
          <label for="experience">Experience</label>
          <input type="number" class="form-control" id="experience" v-model="experience" required>
        </div>
        <div class="form-group">
          <label for="description">Description (max 200 characters)</label>
          <textarea class="form-control" id="description" v-model="description" required maxlength="200"></textarea>
        </div>
        <div class="form-group">
          <label for="price">Price</label>
          <input type="number" class="form-control" id="price" v-model="price" required>
        </div>
        <div class="form-group">
          <label for="specialisation">Specialisation</label>
          <input type="text" class="form-control" id="specialisation" v-model="specialisation" required>
        </div>
        <div class="form-group">
          <label for="mobile">Mobile</label>
          <input type="number" class="form-control" id="mobile" v-model="mobile" required>
        </div>
        <button type="submit" class="btn btn-primary" >Submit</button>
      </form>
    </div>
  </template>
  
  <script>
    import {   getFirestore, updateDoc } from "firebase/firestore";
  import { doc,getDoc} from "firebase/firestore";
  import { getStorage, ref, uploadBytes } from 'firebase/storage';
export default {
  name: "DoctorProfile",
    
    data() {
      return {
        selectedFile: null,
        docId: '',
        name: "",
        gender:"",
        dob: "",
        qualification: "",
        experience: "",
        description: "",
        price: "",
        specialisation: "",
        mobile: "",
      
      };
    },

  methods: {
     handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
  async submitForm() {
      // Log form data
      const docId = this.$route.params.docId;
    const db = getFirestore();
    const userDocRef = doc(db, "Users", docId);
    const usersSnapshot = await getDoc(userDocRef);
    const usersData = usersSnapshot.data()
    const DocumentRef = usersData.mydetails;
    
    //const DoctorsDataCollection=collection(db,"DoctorsData")
    //const DoctorData=
   
    
        // Retrieve the appointmentRef from the Users document

       
    //const mydetailsRef= await addDoc(DoctorsDataCollection,DoctorData)
    await updateDoc(DocumentRef,
    {
      name: this.name,
      gender:this.gender,
      dob: this.dob,
      qualification: this.qualification,
      experience: this.experience,
      description: this.description,
      price: this.price,
      specialisation: this.specialisation,
      mobile: this.mobile,
      ProfileImg: this.selectedFile.name
    
    }
    ,{ merge: true })
      .then(() => {
        alert("Form submitted successfully");
        // Optionally, you can perform any further actions or show a success message here
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        // Optionally, you can show an error message here
      });
       const storageRef = getStorage();
      const profilePictureRef = ref(storageRef, 'Profile Pictures/' + this.selectedFile.name);

     
      uploadBytes(profilePictureRef, this.selectedFile).then(()=>{
        alert("image is set")
      }).catch((error)=>{
        alert("error in image uploading",error)
      })
  }
  }
};
    
  
  </script>

  <style scoped>
  h2{
    color: brown;
  }
  .form-group{
    display: block;
    margin: auto;
    width: 80%;
  }
  .btn{
    margin-top: 20px;
  }
  </style>
  