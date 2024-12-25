<template>
  <div class="home">
    <div class="hero fade-in">
      <img src="https://via.placeholder.com/1500x500" alt="Hero Image" class="hero-image" />
      <div class="hero-content">
        <h1 class="title">Welcome to the Portfolio App</h1>
        <p class="subtitle">Create your resume fast and easy!</p>
        <p class="tagline">Unleash your creativity with customizable templates and stunning designs.</p>
        <router-link to="/register" class="btn btn-primary">Get Started</router-link>
      </div>
    </div>

    <section class="features-section fade-in">
      <h2>Features</h2>
      <div class="features">
        <div class="feature-card">
          <img src="https://via.placeholder.com/150" alt="Customizable Templates" />
          <h3>Customizable Templates</h3>
          <p>Choose from a variety of professional designs tailored to your needs.</p>
        </div>
        <div class="feature-card">
          <img src="https://via.placeholder.com/150" alt="Easy Editor" />
          <h3>Easy-to-Use Editor</h3>
          <p>Create and edit your resume effortlessly with our intuitive interface.</p>
        </div>
        <div class="feature-card">
          <img src="https://via.placeholder.com/150" alt="Download Options" />
          <h3>Download in Multiple Formats</h3>
          <p>Export your resume as PDF, Word, or image files with one click.</p>
        </div>
        <div class="feature-card">
          <img src="https://via.placeholder.com/150" alt="Share Online" />
          <h3>Share Online</h3>
          <p>Host your resume online and share the link with employers instantly.</p>
        </div>
      </div>
    </section>

    <section class="testimonials-section fade-in">
      <h2>Testimonials</h2>
      <div class="testimonials">
        <blockquote>
          <p>"This app made my resume stand out! Highly recommend!"</p>
          <footer>- Jane Doe</footer>
        </blockquote>
        <blockquote>
          <p>"Creating my resume was a breeze. Love the designs!"</p>
          <footer>- John Smith</footer>
        </blockquote>
      </div>
    </section>

    <section class="about-section fade-in">
      <h2>About Us</h2>
      <div class="about">
        <img src="https://via.placeholder.com/1500x400" alt="About Us Image" class="about-image" />
        <p class="about-text">Our app is dedicated to helping you craft the perfect resume. With user-friendly tools and a wide range of features, we aim to make the job application process seamless and stress-free.</p>
      </div>
    </section>

    <div class="cta-buttons fade-in">
      <router-link to="/login" class="btn btn-secondary">Login</router-link>
      <router-link to="/register" class="btn btn-primary">Register</router-link>
    </div>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
  margin: 0 auto;
  max-width: 1200px;
  padding: 20px;
  background: linear-gradient(to bottom, #ffffff, #f0f4f8);
  border-radius: 15px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  animation: slide-in 0.5s ease-out;
}
.hero {
  position: relative;
  margin-bottom: 30px;
}
.hero-image {
  width: 100%;
  height: auto;
  border-radius: 15px;
}
.hero-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
}
.title {
  font-size: 2.5rem;
  margin-bottom: 10px;
}
.subtitle {
  font-size: 1.2rem;
  margin-bottom: 10px;
}
.tagline {
  font-size: 1rem;
  margin-bottom: 20px;
  opacity: 0.8;
}
.features-section {
  margin: 40px 0;
}
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}
.feature-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}
.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}
.feature-card img {
  max-width: 100px;
  margin-bottom: 10px;
}
.testimonials-section {
  margin: 40px 0;
}
.testimonials {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
blockquote {
  font-style: italic;
  background: #f8f9fa;
  border-left: 5px solid #007bff;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 600px;
}
footer {
  font-size: 0.9rem;
  color: #555;
}
.about-section {
  margin: 40px 0;
}
.about {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.about-image {
  width: 100%;
  height: auto;
  margin-bottom: 20px;
  border-radius: 15px;
}
.about-text {
  font-size: 1rem;
  max-width: 800px;
  text-align: justify;
  color: #333;
}
.cta-buttons {
  margin-top: 30px;
}
.btn {
  display: inline-block;
  margin: 10px;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  text-decoration: none;
  transition: all 0.3s;
}
.btn-primary {
  background-color: #007bff;
  color: white;
}
.btn-primary:hover {
  background-color: #0056b3;
}
.btn-secondary {
  background-color: #6c757d;
  color: white;
}
.btn-secondary:hover {
  background-color: #5a6268;
}
.fade-in {
  opacity: 0;
  animation: fade-in 1s forwards;
}
@keyframes fade-in {
  to {
    opacity: 1;
  }
}
@keyframes slide-in {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
