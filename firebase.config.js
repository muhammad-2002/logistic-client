
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey:import.meta.env.VITE_APIKEY, 
  authDomain:import.meta.env.VITE_AUTHDOMAIN, 
  projectId:import.meta.env.VITE_PROJECTID, 
  storageBucket:import.meta.env.VITE_STORAGEBUCKET, 
  messagingSenderId:import.meta.env.VITE_MESSAGINGSENDERID, 
  appId:import.meta.env.VITE_APPID, 
  measurementId:import.meta.env.VITE_MEASUREMENTID, 
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth =getAuth(app)
export default auth