import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import axios from 'axios';

function Login() {
  const handleLogin = async () => {
    try {
      // 1️⃣ Trigger Google login popup
      const result = await signInWithPopup(auth, provider);
      console.log("✅ Firebase user:", result.user);

      // 2️⃣ Get the Firebase ID token (proof of login)
      const token = await result.user.getIdToken();
      console.log("🪪 Firebase Token:", token);

      // 3️⃣ Send token to backend for verification
      const res = await axios.get('http://localhost:3000/api/test-auth', {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log("🎉 Backend Response:", res.data);
      alert("Login successful!");
    } catch (error) {
      console.error("❌ Login failed:", error);
      alert("Login failed. Check console for details.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>
      <h2>Login to Mentorship Platform</h2>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
}

export default Login;
