import {
  GithubAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";

import auth from "./../../../firebase.config";

export const AuthContext = createContext(null);
const Provider = ({ children }) => {
  const GoogleProvider = new GoogleAuthProvider();
  const GithubProvider = new GithubAuthProvider();
  const TwitterProvider = new TwitterAuthProvider();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //sign in with email and password
  const createEmailAndPassword = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //Create for Google
  const createForGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, GoogleProvider);
  };
  //Create for Github
  const createForGithub = () => {
    setLoading(true);
    return signInWithPopup(auth, GithubProvider);
  };
  //Create for Twitter
  const createForTwitter = () => {
    setLoading(true);
    return signInWithPopup(auth, TwitterProvider);
  };

  //LoginEmailAnd Password
  const logInEmailAndPassword = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //update user
  const UpdateUser = (name, photoUrl) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoUrl,
    });
  };

  //SignOut User
  const logOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          setUser(user);
          setLoading(false);
        } else {
          setUser(null);
          setLoading(false);
        }
      },
      () => unsubscribe()
    );
  }, []);

  const authInfo = {
    user,
    setUser,
    createForGoogle,
    createForTwitter,
    createForGithub,
    logOutUser,
    createEmailAndPassword,
    logInEmailAndPassword,
    UpdateUser,
    loading,
    setLoading,
  };
  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default Provider;
