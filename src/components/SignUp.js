import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../fonts.css';

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <button style={styles.backButton} onClick={() => navigate('/')}>
        ← Back
      </button>
      <div style={styles.container}>
        <h2 style={styles.title}>Sign Up</h2>
        <p style={styles.subtitle}>Create an account to get started</p>

        <input type="text" placeholder="Name" style={styles.input} />
        <input type="tel" placeholder="Phone Number" style={styles.input} />
        <input type="email" placeholder="Email" style={styles.input} />
        <input type="password" placeholder="Password" style={styles.input} />
        <input type="password" placeholder="Confirm Password" style={styles.input} />

        <button style={styles.button}>Sign Up</button>
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    minHeight: '100vh',
    position: 'relative',
    fontFamily: 'sans-serif',
    overflow: 'hidden',
  },
  container: {
    width: '450px',
    // Adjusted height to fit new fields
    height: '550px', 
    backgroundColor: '#fff',
    borderRadius: '20px',
    padding: '40px 30px',
    boxShadow: '0 0 30px rgba(0,0,0,0.2)',
    zIndex: 2,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    background: 'none',
    border: 'none',
    color: '#EA5444',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '10px',
    color: '#EA5444',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '14px',
    color: '#777',
    marginBottom: '30px',
    textAlign: 'center',
  },
  input: {
    padding: '12px 16px',
    marginBottom: '20px',
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box', // Added for consistent padding
  },
  button: {
    width: '100%',
    backgroundColor: '#EA5444',
    color: '#fff',
    padding: '12px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    letterSpacing: '1px',
    transition: 'background 0.3s ease',
    marginTop: '10px', // Added margin for spacing
  },
};

export default SignUp;
