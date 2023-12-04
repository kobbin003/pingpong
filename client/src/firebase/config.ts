// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyARYYMiCZwykjORZrifXZAEAkoDhRYbWVs",
	authDomain: "ping-pong-5361a.firebaseapp.com",
	projectId: "ping-pong-5361a",
	storageBucket: "ping-pong-5361a.appspot.com",
	messagingSenderId: "223367828380",
	appId: "1:223367828380:web:2750488ac768227103ae59",
	measurementId: "G-VGVE7D02YF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
