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
import usePublicAxiosSecure from "./../shared/CustomHook/usePublicAxiosSecure";

export const AuthContext = createContext(null);
const Provider = ({ children }) => {
  const GoogleProvider = new GoogleAuthProvider();
  const GithubProvider = new GithubAuthProvider();
  const TwitterProvider = new TwitterAuthProvider();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublicSecure = usePublicAxiosSecure();

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
  const unSubscribe = useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const email = user.email;
          const res = await axiosPublicSecure.post("/jwt", { email });
          if (res.data.token) {
            localStorage.setItem("accessToken", res.data.token);
            setLoading(false);
            setUser(user);
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        setUser(null);
        localStorage.removeItem("accessToken");
        setLoading(false);
      }
    });
    return () => unSubscribe;
  }, [axiosPublicSecure]);

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
