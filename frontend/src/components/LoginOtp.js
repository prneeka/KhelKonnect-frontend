import { useState,useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from "../context/AuthContext";
const LoginOtp = () => {  
    const navigate = useNavigate();
    const location = useLocation();
    const { email,password } = location.state || {};
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const { login, loading, error,setErrors } = useAuth();
    const inputsRef = useRef([]);
    
    const handleChange = (index, value) => {
      if (!/^\d*$/.test(value)) return;
      
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      if (value && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    };
    
    const handleKeyDown = (index, e) => {
      if (e.key === 'Backspace' && !otp[index] && index > 0) {
        inputsRef.current[index - 1].focus();
      }
    };
    
    const handlePaste = (e) => {
      e.preventDefault();
      const pasteData = e.clipboardData.getData('text').slice(0, 6);
      if (/^\d+$/.test(pasteData)) {
        const newOtp = pasteData.split('').slice(0, 6);
        setOtp([...newOtp, ...Array(6 - newOtp.length).fill('')]);
        
        if (newOtp.length === 6) {
          inputsRef.current[5].focus();
        } else if (newOtp.length > 0) {
          inputsRef.current[newOtp.length].focus();
        }
      }
    };
    
    const handleSubmit = () => {
      const enteredOtp = otp.join('');
      console.log(email,password);
      login(email, enteredOtp,navigate);
    };  
    const handleResend = async () => {
      try {
        await axios.post('/auth/resend-otp', { email: email });
        
      } catch (error) {
        
        setErrors('Failed to resend OTP. Please try again.');
      }
    };
    
    return (
      <div style={styles.page}>
        <button style={styles.backButton} onClick={() => navigate('/login')}>
          ← Back
        </button>
        <div style={styles.container}>
          <h2 style={styles.title}>Verify OTP</h2>
          <p style={styles.subtitle}>
            Enter the 6-digit code sent to {email}
          </p>
    
          <div style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                style={{...styles.otpInput, ...(digit && styles.otpInputFilled)}}
                disabled={loading}
              />
            ))}
          </div>
    
          {error && <span style={styles.error}>{error}</span>}
    
          <button 
            style={{...styles.button, ...(loading && styles.buttonDisabled)}} 
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify'}
          </button>
    
          <p style={styles.resendText}>
            Didn't receive the code?{' '}
            <span style={styles.resendLink} onClick={handleResend}>
              Resend
            </span>
          </p>
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
    textAlign: 'center',
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
  otpContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '30px',
    gap: '10px',
  },
  otpInput: {
    width: '50px',
    height: '50px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    textAlign: 'center',
    fontSize: '20px',
    fontWeight: '600',
    outline: 'none',
    transition: 'all 0.2s',
  },
  otpInputFilled: {
    borderColor: '#EA5444',
    boxShadow: '0 0 0 2px rgba(234, 84, 68, 0.2)',
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
    marginBottom: '20px',
  },
  resendText: {
    fontSize: '14px',
    color: '#777',
    margin: 0,
  },
  resendLink: {
    color: '#EA5444',
    cursor: 'pointer',
    fontWeight: '600',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  },
  error: {
    color: '#e74c3c',
    fontSize: '14px',
    display: 'block',
    marginBottom: '15px',
    textAlign: 'center',
  },
};
  
export default LoginOtp;
