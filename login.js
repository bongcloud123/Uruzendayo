import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBkm9J5WvCAzWfN9g0NuodWw3oiedfT6ok",
    authDomain: "uruzendayo-v2.firebaseapp.com",
    projectId: "uruzendayo-v2",
    storageBucket: "uruzendayo-v2.appspot.com",
    messagingSenderId: "683556963058",
    appId: "1:683556963058:web:fda65ceeb7a6f5149e066b"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("User logged in:", userCredential.user.uid);
            // Redirect to the main application page
            window.location.href = "index.html";  
        })
        .catch((error) => {
            console.error("Login Error:", error); 
            // Display an error message to the user
        });
});
