import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
	apiKey: "AIzaSyBqe8IJ3g2Vw5G__gnpv9izC00XDzfvPPY",
	authDomain: "commerse-app-shop.firebaseapp.com",
	projectId: "commerse-app-shop",
	storageBucket: "commerse-app-shop.appspot.com",
	messagingSenderId: "501936400924",
	appId: "1:501936400924:web:4cbcc1e2a5f2da942c8dd9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
export default app;