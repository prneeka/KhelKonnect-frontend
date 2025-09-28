import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "", otp: "" });
  const { sendotp, loading, errors,setErrors } = useAuth();
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Enter a valid email address';
        break;
      case 'password':
        if (value.length < 8) {
          error = 'Password must be at least 8 characters';
        }
        break;
      default:
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
    
    return !error;
  };


  const handleSubmit = async () => {
    const newTouched = {};
    Object.keys(formData).forEach(key => {
      newTouched[key] = true;
    });
    setTouched(newTouched);
    await sendotp(formData.email, formData.password,navigate);
  };

  return (
    <div style={styles.page}>
      <button style={styles.backButton} onClick={() => navigate('/')}>
        ← Back
      </button>
      <div style={styles.container}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Log in to continue</p>

 
        <div style={styles.inputContainer}>
          <input 
            type="email" 
            name="email"
            placeholder="Email" 
            style={{...styles.input, ...(errors.email && styles.inputError)}} 
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && <span style={styles.error}>{errors.email}</span>}
        </div>

        <div style={styles.inputContainer}>
          <input 
            type="password" 
            name="password"
            placeholder="Password" 
            style={{...styles.input, ...(errors.password && styles.inputError)}} 
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && <span style={styles.error}>{errors.password}</span>}
        </div>

        <button 
          style={{...styles.button, ...(loading && styles.buttonDisabled)}} 
          onClick={handleSubmit}
          disabled={loading}
        >
        {loading ? (
          <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            Sending OTP...
          </div>
          ) : (
          'Log in'
        )}
        </button>
      
        {errors.submit && <span style={styles.error}>{errors.submit}</span>}

      </div>
    </div>
  );
};

const styles = {
  page: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    position: 'relative',
    fontFamily: 'sans-serif',
  },
  container: {
    width: '450px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '40px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
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
    padding: '8px 12px',
    borderRadius: '6px',
    transition: 'background-color 0.2s',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '8px',
    color: '#EA5444',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '14px',
    color: '#777',
    marginBottom: '30px',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: '16px',
  },
  input: {
    padding: '14px 16px',
    width: '100%',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  },
  inputError: {
    borderColor: '#e74c3c',
  },
  select: {
    padding: '14px 16px',
    width: '100%',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
    backgroundColor: 'white',
    cursor: 'pointer',
  },
  button: {
    width: '100%',
    backgroundColor: '#EA5444',
    color: '#fff',
    padding: '14px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    marginTop: '8px',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  spinner: {
    width: '16px',
    height: '16px',
    border: '2px solid #ffffff',
    borderTop: '2px solid transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  error: {
    color: '#e74c3c',
    fontSize: '14px',
    display: 'block',
    marginTop: '10px',
    textAlign: 'center',
  },
};

export default Login;
