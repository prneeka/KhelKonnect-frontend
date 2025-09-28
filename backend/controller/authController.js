const {sender,generateOTP,saveOtp,verifyOtp} = require("../utils/HelperFunc")
const { admin, db } = require("../config/firebaseConfig");
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
exports.send_signup_otp = async (req, res) => {
    const { email } = req.body;
    const ipAddress = req.ip;
    const trimmedEmail = email ? email.trim() : '';
    console.log('se');
    try {

      try {
        const userRecord = await admin.auth().getUserByEmail(trimmedEmail);
        return res.status(400).json({ error: 'Email already registered' });
      } catch (error) {
        if (error.code === 'auth/user-not-found') {
        } else {
            throw error;
        }
      }
      const otp = generateOTP();
  
      await saveOtp(email,otp,ipAddress)
  
      await sender.sendMail({
        from: `"Authenticator" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Your Signup OTP',
        text: `Your OTP for signup is: ${otp}`,
        html: `<p>Your OTP for signup is: <strong>${otp}</strong></p>
               <p>This OTP will expire in 5 minutes.</p>`
      });
  
      res.json({ 
        message: 'OTP sent successfully',
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to process OTP request' });
    }
}

exports.send_login_otp = async (req, res) => {
  const { email, password } = req.body;
  const ipAddress = req.ip;
  const trimmedEmail = email ? email.trim() : '';
  console.log(email);
  
  if (!trimmedEmail || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    try {
      await admin.auth().getUserByEmail(trimmedEmail);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
          return res.status(400).json({ error: 'Email not registered' });
      }
      throw error;
    }
    const API_KEY = process.env.FIREBASE_API_KEY;
    const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
            email: trimmedEmail,
            password: password,
            returnSecureToken: false // No tokens needed for OTP flow
        }
    );
    const otp = generateOTP();
    await saveOtp(trimmedEmail, otp, ipAddress);
    await sender.sendMail({
        to: trimmedEmail,
        subject: 'Your Login OTP',
        text: `Your OTP for login is: ${otp}`
    });
    res.json({ message: 'OTP sent successfully' });

  } catch (error) {
    if (error.response?.data?.error?.message === 'INVALID_PASSWORD') {
        return res.status(400).json({ error: 'Invalid password' });
    }
    if (error.response?.data?.error?.message === 'EMAIL_NOT_FOUND') {
        return res.status(400).json({ error: 'Email not registered' });
    }
    console.error('Login OTP error:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

exports.signup = async (req, res) => {
  const { email, otp, userData } = req.body;
  const ipAddress = req.ip;
  
  const trimmedName = userData?.name ? userData.name.trim() : '';
  const trimmedEmail = email ? email.trim() : '';
  const trimmedPassword = userData?.password ? userData.password.trim() : '';
  const trimmedOtp = otp ? otp.trim() : '';
  const trimmedRole = userData?.role ? userData.role.trim() : '';
  const trimmedPhone = userData?.phone ? userData.phone.trim() : '';
  
  console.log('Trimmed data:', { trimmedName, trimmedEmail, trimmedPassword, trimmedOtp, trimmedRole, trimmedPhone }); // Debug log

  if (!trimmedName || !trimmedEmail || !trimmedPassword || !trimmedOtp) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (trimmedPassword.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' });
  }

  if (!['user', 'organisation'].includes(trimmedRole)) {
    return res.status(400).json({ error: 'Invalid role specified' });
  }

  try {
    const otpRecord = await verifyOtp(trimmedEmail, trimmedOtp, ipAddress);
    console.log('OTP verification result:', otpRecord); 

    if (!otpRecord.success) {
      return res.status(400).json({ error: otpRecord.message });
    }

    const userRecord = await admin.auth().createUser({
      email: trimmedEmail,
      password: trimmedPassword,
      displayName: trimmedName,
    });

    const userFirestoreData = {
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      role: trimmedRole,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      uid: userRecord.uid 
    };


    if (trimmedRole === 'user') {
      await admin.firestore().collection("users").doc(userRecord.uid).set(userFirestoreData);
    } else if (trimmedRole === 'organisation') {
      await admin.firestore().collection("organisations").doc(userRecord.uid).set(userFirestoreData);
    }
    
    res.json({ success: true, message: 'User created successfully', uid: userRecord.uid });
  } catch (error) {
    
    if (error.code === 'auth/email-already-exists') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    if (error.code === 'auth/invalid-email') {
      return res.status(400).json({ error: 'Invalid email address' });
    }
    if (error.code === 'auth/weak-password') {
      return res.status(400).json({ error: 'Password is too weak' });
    }
    res.status(500).json({ error: 'Failed to complete signup: ' + error.message });
  }
};

exports.login = async (req, res) => {
  const { email, otp } = req.body;
  const ipAddress = req.ip;
  
  const trimmedEmail = email ? email.trim() : '';
  const trimmedOtp = otp ? otp.trim() : '';
  
  if (!trimmedEmail || !trimmedOtp) {
      return res.status(400).json({ error: 'Email and OTP are required' });
  }

  try {
      // Verify OTP
      const otpRecord = await verifyOtp(trimmedEmail, trimmedOtp, ipAddress);
      console.log('OTP verification result:', otpRecord);
      
      if (!otpRecord.success) {
          return res.status(400).json({ error: otpRecord.message });
      }

      let userRecord;
      try {
          userRecord = await admin.auth().getUserByEmail(trimmedEmail);
          console.log('User found in Firebase Auth:', userRecord.uid);
      } catch (error) {
          if (error.code === 'auth/user-not-found') {
              return res.status(400).json({ error: 'User not found' });
          }
          throw error;
      }
      console.log;('sadv');
      //user data from Firestore
      let userData = null;
      try {
          const userDoc = await admin.firestore().collection('users').doc(userRecord.uid).get();
          const orgDoc = await admin.firestore().collection('organisations').doc(userRecord.uid).get();
          
          if (userDoc.exists) {
              userData = { ...userDoc.data(), collection: 'users' };
          } else if (orgDoc.exists) {
              userData = { ...orgDoc.data(), collection: 'organisations' };
          }
      } catch (dbError) {
          console.warn('Could not fetch user data:', dbError);
      }
      console.log;('sadv');
      const sessionToken = uuidv4();
      req.session.user = {
          id: userRecord.uid,
          email: userRecord.email,
          name: userRecord.displayName || userData?.name,
          role: userData?.role,
          sessionToken: sessionToken,
          loginTime: new Date()
      };

      try {
          if (userData?.collection === 'users') {
              await admin.firestore().collection('users').doc(userRecord.uid).update({
                  lastLoginAt: admin.firestore.FieldValue.serverTimestamp()
              });
          } else if (userData?.collection === 'organisations') {
              await admin.firestore().collection('organisations').doc(userRecord.uid).update({
                  lastLoginAt: admin.firestore.FieldValue.serverTimestamp()
              });
          }
      } catch (dbError) {
          console.warn('Could not update last login timestamp:', dbError);
      }
      console.log('comp');
      res.json({
          success: true,
          message: 'Login successful',
          user: {
              uid: userRecord.uid,
              email: userRecord.email,
              name: userRecord.displayName || userData?.name,
              role: userData?.role
          }
      });

  } catch (error) {
      console.error('Error in login_with_otp:', error);
      res.status(500).json({ error: 'Failed to complete login' });
  }
};

// Logout endpoint
exports.logout = async (req, res) => {
  try {
    req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).json({ error: 'Failed to logout' });
    }
      
    res.clearCookie('connect.sid', {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    });
    
    res.json({ success: true, message: 'Logged out successfully' });
    });
    
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Failed to logout' });
  }
};

exports.check = (req, res) => {
  if (req.session.user) {
    res.json({ 
      authenticated: true, 
      user: req.session.user 
    });
  } else {
    res.json({ 
      authenticated: false 
    });
  }
}