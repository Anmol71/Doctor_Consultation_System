<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <router-link v-if="!loggedIn" to="/login" class="navbar-brand">Login</router-link>
        <button v-if="loggedIn" @click="logout" class="btn btn-link navbar-btn">Logout</button>
        <div v-if="loggedIn" class="navbar-nav">
          <router-link to="/notifications" class="nav-link">
            <i class="fas fa-bell"></i>
            <span class="badge bg-danger">{{ notificationCount }}</span>
          </router-link>
          <router-link :to="chatPageRoute" class="nav-link">
            <i class="fas fa-comment"></i>
          </router-link>
        </div>
      </div>
    </nav>
    
    



   



  </div>
</template>

<script>
import { getAuth, signOut , onAuthStateChanged } from 'firebase/auth';
import { ref, onValue } from 'firebase/database';
import { getDatabase } from 'firebase/database';

export default {
  name: 'NavBar',
  computed: {
    chatPageRoute() {
      const docId = this.$route.params.docId;
      return `/ChatPage/${docId}`;
    }
  },
 
  data() {
    return {
      notificationCount: 0,
      loggedIn: false,
      user: null,
     
      
    };
  },
  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          alert('Logout successful');
          this.$router.push('/login');
        })
        .catch((error) => {
          console.error('Logout error:', error);
        });
    },
    fetchNotificationCount() {
      const db = getDatabase();
      const userId = this.$route.params.docId;
      const notificationRef = ref(db, `notification/${userId}/count`);
      onValue(notificationRef, (snapshot) => {
        this.notificationCount = snapshot.val();
      });
    }
  },
  mounted() {
    this.fetchNotificationCount();
  
  },
  
  created() {
    
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in
        this.loggedIn = true;
        this.user = user;
      } else {
        // User is logged out
        this.loggedIn = false;
        this.user = null;
      }
    });
  },
};
</script>

<style scoped>
.fa-bell,
.fa-comment {
  margin-right: 5px;
}


.container-fluid{
  background-color: rgb(244, 222, 222);
  padding: 20px;
}
.navbar-brand{
  background-color: rgb(100, 20, 20);
  padding: 10px;
  border-radius: 10px;
  color: white;
}
.body{
  background-color: rgb(255, 255, 255);
  width: 100vw;
  height: 100vh;
  display: flex;
  
}
.doctor{
  width: 100vw;
  height: 100vh;
}
.body>h3{
  color: rgb(100, 20, 20);
  padding: 10px;
}
.image{
  background-image: url("./doctor.jpg");
  width: 600px;
  height: 600px;
  margin-left: 70px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}
.text{
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 130px;
  
}
.text>h3{
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.text>h1{
  color: brown;
}
.text>h2{
  background-color: brown;
  color: white;
  border-radius: 10px;
}
.side{
  width: 400px;
  height: 600px;
  margin-right: -450px;
}




.testimonials {
  background-color: #f2f2f2;
  padding: 20px;
}

.testimonials h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

.testimonial-card {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.testimonial-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 10px;
}

.testimonial-text {
  font-size: 14px;
  color: #888;
  margin-bottom: 5px;
}

.testimonial-author {
  font-size: 12px;
  color: #555;
}



.about-us{
  padding: 50px;
  background-color: brown;
  color: white;

}



/* General styles */
.footer-content {
  display: flex;
  justify-content: space-between;
  background-color: #f2f2f2;
  padding: 20px;
}

.footer-section {
  flex: 1;
  margin-right: 20px;
}

h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

p {
  font-size: 14px;
  color: #ffffff;
}

.contact span {
  display: block;
  margin-bottom: 5px;
}

.social-icons a {
  margin-right: 10px;
  color: #888;
  text-decoration: none;
}

/* Links section */
.links ul {
  list-style-type: none;
  padding: 0;
}

.links li {
  margin-bottom: 5px;
}

.links a {
  text-decoration: none;
  color: #888;
}

/* Contact form section */
.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.contact-form button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.contact-form button:hover {
  background-color: #45a049;
}
</style>
