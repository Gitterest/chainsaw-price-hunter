import { useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate success for now
    setSubmitted(true);
  };

  return (
    <div style={pageStyle}>
      <h1>Contact Us</h1>
      {submitted ? (
        <p style={successMsg}>Thanks for reaching out. We'll get back to you shortly!</p>
      ) : (
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={groupStyle}>
            <input type="text" placeholder="Name" required style={inputStyle} />
          </div>
          <div style={groupStyle}>
            <input type="email" placeholder="Email" required style={inputStyle} />
          </div>
          <div style={groupStyle}>
            <textarea placeholder="Your message" required style={inputStyle} rows={4}></textarea>
          </div>
          <button type="submit" style={submitBtn}>Send</button>
        </form>
      )}
    </div>
  );
}

const pageStyle = {
  maxWidth: "600px",
  margin: "40px auto",
  padding: "20px",
  fontFamily: "sans-serif",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const groupStyle = {
  display: "flex",
  flexDirection: "column",
};

const inputStyle = {
  padding: "10px",
  fontSize: "1rem",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const submitBtn = {
  padding: "10px",
  fontSize: "1rem",
  backgroundColor: "#444",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const successMsg = {
  color: "green",
  fontWeight: "bold",
};
