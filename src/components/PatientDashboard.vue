<template>
  <div class="col">



    <br>
    <h1>Dashboard</h1>
    
    <div v-if="dataList.length > 0">
      <div v-for="item in dataList" :key="item.id" class="card">
        <div class="card mb-6" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
              <img :src="item.image" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-7">
              <div class="card-body">
                <h5 class="card-title">{{ item.name }}</h5>
                <h4 class="card=text">{{ item.qualification }},{{ item.specialisation }}</h4>
                <h4 class="card-text">{{ item.experience }}YEARS</h4>
               

                <div>
                  <div class="collapse collapse-vertical" id="collapseWidthExample">
                    <div class="card card-body" style="width: auto;">
                      <p class="card-text">{{ item.description }}</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div class="row g-0 bg-success" style="height:40px;">
              <div class="col">
                <button class="btn btn-primary" type="button" data-bs-toggle="collapse"
                  data-bs-target="#collapseWidthExample" aria-expanded="false" :aria-controls=item.id>
                  Toggle width collapse
                </button>
                <button type="button" class="btn btn-secondary btn-sm" data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop" @click="bookingModal(item)">
                  Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
<div>
  
</div>
    <!-- Button trigger modal -->


    <!-- Modal -->

    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Booking</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">

            <BookingPage :selectedData="selectedData" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Understood</button>
          </div>
        </div>
      </div>
    </div>




  </div>
</template>
  
<script>


import BookingPage from './BookingPage.vue';
import { collection, onSnapshot } from 'firebase/firestore';
import { getFirestore } from "firebase/firestore"
import { getDownloadURL, getStorage,ref } from 'firebase/storage';
export default {
  name: "PatientDashboard",
  props: ['docId'],
  components: {
    BookingPage,
    
  },

  data() {
    return {
      dataList: [],
      selectedData: null
    };
  },

  mounted() {
    const db = getFirestore();
    const dataCollection = collection(db, "DoctorsData");
    const storage = getStorage();

    onSnapshot(dataCollection, async (snapshot) => {
      this.dataList = await Promise.all(snapshot.docs.map(async (doc) => {
        const data = doc.data();

        // Create a reference to the image in Firebase Storage
        const imageRef = ref(storage, 'Profile Pictures/' + data.ProfileImg);

        // Get the download URL for the image
        try {
          const downloadURL = await getDownloadURL(imageRef);
          return {
            id: doc.id,
            ...data,
            image: downloadURL,
          };
        } catch (error) {
          console.error("Error getting download URL:", error);
          return {
            id: doc.id,
            ...data,
            image: null, // Handle error by setting image to null
          };
        }
      }));
    });
  },
  methods: {
    bookingModal(item) {
      this.selectedData = item;
      console.log("Selected Data:", item);

      // Open the booking modal here or perform any other actions you need
    },
  }
  // components: { BookingPage }
};
</script>
  
<style scoped>
.container {
  margin: 20px;
}

/* Reset default margin and padding */
html, body {
  margin: 0;
  padding: 0;
}

/* Dashboard container */
.col {
  display: flex;
  flex-direction: column;
}

/* Dashboard header */
h1 {
  font-size: 24px;
  margin-bottom: 1rem;
}

/* Cards */
.card {
  width: 80%;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  display: block;
  margin: auto;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card img {
  max-width: 100%;
  height: auto;
  border-radius: 8px 0 0 8px;
}

.card-body {
  padding: 1rem;
}

.card-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.card-text {
  margin-bottom: 1rem;
}

.text-body-secondary {
  color: #888;
}
/* Buttons */
.btn-primary {
  background-color: #007bff;
  color: #fff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: #fff;
  border-color: #6c757d;
}

.btn-secondary:hover {
  background-color: #545b62;
  border-color: #545b62;
}

.btn-sm {
  font-size: 12px;
  padding: 0.375rem 0.75rem;
}

/* Modal */
.modal-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #ccc;
}

.modal-title {
  margin: 0;
  padding: 1rem;
  font-size: 24px;
}

.modal-body {
  padding: 1rem;
}

.modal-footer {
  padding: 1rem;
  border-top: 1px solid #ccc;
  justify-content: space-between;
}

/* Additional styling for the modal content if needed */
.modal-content {
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.row{
  width: 100%;
  margin: 20px;
  
}
</style>
  