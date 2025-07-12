import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // console.log(loading,user);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };
  const logOut = () => {
    return signOut(auth);
  };
  const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };
  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    setUser(currentUser);
    setLoading(false);

    if (currentUser) {
      // ✅ Request JWT token from backend
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/jwt`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: currentUser.email }),
        });
        const data = await res.json();
        localStorage.setItem('access-token', data.token);
      } catch (err) {
        console.error('JWT fetch error:', err);
      }
    } else {
      // ✅ Remove token on logout
      localStorage.removeItem('access-token');
    }
  });

  return () => unsubscribe();
}, []);


  const authData = {
    user,
    setUser,
    createUser,
    logOut,
    logIn,
    loading,
    setLoading,
    updateUser,
    loginWithGoogle,
  };
  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
