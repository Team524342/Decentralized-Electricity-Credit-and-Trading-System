import React from "react";
import "../assets/index.css";

function Contact() {
  return (
    <div className="page-container">
      {/* 📬 Contact Header */}
      <h1>📬 Contact Us — RTDECTS</h1>
      <p>
        Whether you're an investor, energy producer, or simply interested in renewable
        technologies, we'd love to hear from you!  
        Our team is always open to collaboration, innovation, and feedback.
      </p>

      {/* 🧭 Contact Information */}
      <section style={{ marginTop: "40px" }}>
        <h3>📞 Get in Touch</h3>
        <p>
          Reach out to us through the following channels or use the contact form below.
        </p>
        <ul style={{ listStyle: "none", padding: 0, textAlign: "left", lineHeight: "1.8" }}>
          <li>📧 <strong>Email:</strong> rtdecenergy@gmail.com</li>
          <li>📱 <strong>Phone:</strong> +91 0123456789</li>
          <li>📍 <strong>Location:</strong> Hyderabad, Telangana, India</li>
        </ul>
      </section>

      {/* 🧾 Contact Form */}
      <section style={{ marginTop: "40px" }}>
        <h3>📝 Send Us a Message</h3>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message..." rows="4"></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>

      {/* 🌐 Map Section */}
      <section style={{ marginTop: "50px" }}>
        <h3>📍 Find Us on the Map</h3>
        <div style={{ marginTop: "20px" }}>
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.5035694982176!2d78.48667117492638!3d17.385044883494956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9756d7d6b3cf%3A0x25b5b0f81b86af9e!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="250"
            style={{
              border: 0,
              borderRadius: "12px",
              boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)"
            }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* 💬 Social Media Section */}
      <section style={{ marginTop: "50px" }}>
        <h3>🌐 Connect With Us</h3>
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "25px",
          marginTop: "15px"
        }}>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#0a2540",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            🔗 LinkedIn
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#0a2540",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            🐦 Twitter
          </a>
          <a
            href="mailto:rtdecenergy@gmail.com"
            style={{
              color: "#0a2540",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            📧 Email
          </a>
        </div>
      </section>

      {/* 💡 Closing Note */}
      <section style={{ marginTop: "60px" }}>
        <h3>💡 Our Commitment</h3>
        <p>
          At <strong>RTDECTS</strong>, we believe communication fuels innovation.  
          Let's collaborate to create a future where every household contributes to 
          a sustainable energy ecosystem powered by technology and transparency.
        </p>
      </section>
    </div>
  );
}

export default Contact;
