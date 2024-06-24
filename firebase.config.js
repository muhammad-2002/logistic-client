
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBF04HCVIVnvAoAklMxKi6zW-HAhkPKixE",
  authDomain: "logistics-international-7d03b.firebaseapp.com",
  projectId: "logistics-international-7d03b",
  storageBucket: "logistics-international-7d03b.appspot.com",
  messagingSenderId: "77385030417",
  appId: "1:77385030417:web:618c7f61fcc1b98cd98ab0",
  measurementId: "G-73CXB9ZSWY"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth =getAuth(app)
export default auth