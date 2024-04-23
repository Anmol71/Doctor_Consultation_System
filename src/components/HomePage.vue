<template>
    <div>
      <div class="body">
        <div class="image"></div>
        <div class="text">
          <h3>BOOK YOUR</h3>
          <hr>
          <h1>APPOINTMENT</h1>
          <h2>NOW!</h2>
        </div>
        <div> 
          <img src="./sideimage.png" alt="" class="side">
        </div>
        <!-- <img src="./doctor.jpg" alt="nothing" class="doctor">jh -->
      </div>
  
  
  
      <div class="testimonials">
    <h3>Testimonials</h3>
    <div class="testimonial-card">
      <img src="./d1.jpg" alt="Doctor 1" class="testimonial-img">
      <p class="testimonial-text">Dr. John Doe is an amazing doctor. He listens attentively and provides the best medical advice. I highly recommend him.</p>
      <p class="testimonial-author">- Jane Smith</p>
    </div>
    <div class="testimonial-card">
      <img src="./d2.jpg" alt="Doctor 2" class="testimonial-img">
      <p class="testimonial-text">I had a great experience with Dr. Emily Johnson. She is knowledgeable and caring. I feel confident in her treatment.</p>
      <p class="testimonial-author">- Michael Brown</p>
    </div>
  </div>
  
  
      <div class="about-us">
        <h2>About Us</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque fuga incidunt architecto aut reiciendis quisquam optio dolor dignissimos distinctio neque! Adipisci consequatur fugiat illum fuga repudiandae odit at nulla magnam! Voluptatum facere dicta ad iusto rerum, repudiandae, sapiente asperiores itaque, fugiat ut non minima laborum omnis! Esse magni maxime praesentium.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus delectus eligendi veniam, explicabo esse praesentium velit laudantium autem, dignissimos totam consequatur recusandae eius blanditiis quis at quisquam reiciendis doloremque consectetur. Voluptatum pariatur modi vero in dolorem nam provident blanditiis quaerat unde aliquid consectetur perspiciatis, deserunt ex vel sequi consequuntur voluptas ipsam illum odit quis, facilis mollitia? Eos repellat minima ad possimus, nobis repellendus molestiae eum non expedita unde ipsum vel asperiores voluptate aspernatur id quibusdam atque libero quidem quis quam! In quibusdam ut vitae, perspiciatis non reprehenderit obcaecati facere culpa veniam enim odio qui, nulla accusamus animi unde exercitationem repellat!
        </p>
      </div>
      <br>
      <br>
  
  
      <div class="footer">
        <footer>
    <div class="footer-content">
      <div class="footer-section about">
        <div class="contact">
          <span><i class="fas fa-phone"></i> 123-456-7890</span>
          <span><i class="fas fa-envelope"></i> info@example.com</span>
        </div>
        <div class="social-icons">
          <a href="#"><i class="fab fa-facebook"></i></a>
          <a href="#"><i class="fab fa-twitter"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
        </div>
      </div>
      <div class="footer-section links">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Doctors</a></li>
          <li><a href="#">Appointments</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
      <div class="footer-section contact-form">
        <h3>Contact Us</h3>
        <form action="#" method="post">
          <input type="email" name="email" class="text-input contact-input" placeholder="Your email address">
          <textarea name="message" class="text-input contact-input" placeholder="Your message"></textarea>
          <button type="submit" class="btn btn-primary">Send</button>
        </form>
      </div>
    </div>
    <div class="footer-bottom">
      &copy; 2023 Doctor Appointment Website. All rights reserved.
    </div>
  </footer>
  
  
      </div>
    </div>
  </template>
  
  <script>  
  export default {
    name: 'HomePage',
  }
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
  