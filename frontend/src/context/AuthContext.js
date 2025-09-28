import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('http://localhost:3003/auth/check', {
          withCredentials: true
        });
        console.log(response);
        if (response.data.authenticated) {
          setUser(response.data.user);
          
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuthStatus();
  }, []);

  const sendotp = async (email, password, navigate, redirectPath = "/login-otp") => {
    setLoading(true);
    setErrors({ submit: "" });

    try {
      const response = await axios.post(`http://localhost:3003/auth/send-login-otp`, {
        email: email,
        password: password
      });

      if (response.status === 200) {
        navigate(redirectPath, { state: { email, password } });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setErrors({
        submit: error.response?.data?.error || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, otp, navigate, redirectPath = "/dashboard") => {
    if (otp.length !== 6) {
      setErrors('Please enter a valid 6-digit OTP');
      return;
    }
    
    try {
      setLoading(true);
      setErrors({ submit: "" });  
      const response = await axios.post('http://localhost:3003/auth/login', {
        email: email,
        otp: otp
      }, {
        withCredentials: true 
      });
            
      if (response.status === 200) {
        setUser(response.data.user);
        navigate(redirectPath);
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({
        submit: error.response?.data?.error || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const sendsignotp = async (email, userData, navigate, redirectPath = "/otpsend") => {
    setLoading(true);
    setErrors({ submit: "" });

    try {
      const response = await axios.post("http://localhost:3003/auth/send-sign-otp", { email });

      if (response.status === 200) {
        navigate(redirectPath, { state: { userData } });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setErrors({
        submit: error.response?.data?.error || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, otp, userData, navigate, redirectPath = "/login") => {
    if (otp.length !== 6) {
      setErrors('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    setErrors('');

    try {
      const response = await axios.post(
        "http://localhost:3003/auth/signup",
        {
          email,
          otp,
          userData
        }
      );

      if (response.status === 200) {
        navigate(redirectPath);
      }
    } catch (err) {
      setErrors(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const logout = async (navigate) => {
    setLoading(true);
    setErrors('');
    try {
      await axios.post('http://localhost:3003/auth/logout', {}, {
        withCredentials: true
      });
    }  catch (err) {
      setErrors(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
      navigate('/');
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      sendotp, 
      sendsignotp, 
      loading, 
      errors, 
      setErrors, 
      signup,
      authChecked,
      isAuthenticated: !!user,
      userRole: user?.role
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};