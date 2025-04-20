import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtxeS1bDIV6yeFIRm5hj1DOSHNcd0iWTA",
  authDomain: "kidguard-bd47d.firebaseapp.com",
  projectId: "kidguard-bd47d",
  storageBucket: "kidguard-bd47d.firebasestorage.app",
  messagingSenderId: "944513551799",
  appId: "1:944513551799:web:b9663aeba5dd0649022c32",
  measurementId: "G-ZSGML18X33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Get form values
    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    const contact = document.getElementById("contact").value; // Fixed ID reference
    const address = document.getElementById("address").value;
    const password = document.getElementById("password").value;
    const relationship = document.getElementById("relationship").value;

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User created:", user);

      // Save additional user data to Firestore
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        email: email,
        name: name,
        contact: contact,
        address: address,
        relationship: relationship,
        timestamp: new Date()
      });

      alert("User registered successfully!");
      window.location.href = "login.html"; // Redirect to login page after registration
    } catch (error) {
      console.error("Error:", error.message);
      handleAuthError(error.code);
    }
  });
});

// Function to handle authentication errors
function handleAuthError(errorCode) {
  let errorMessage = "An error occurred. Please try again.";
  switch (errorCode) {
    case "auth/email-already-in-use":
      errorMessage = "This email is already registered. Please log in.";
      break;
    case "auth/invalid-email":
      errorMessage = "Invalid email format. Please check your email.";
      break;
    case "auth/weak-password":
      errorMessage = "Password is too weak. Use at least 6 characters.";
      break;
    default:
      errorMessage = "Failed to register. Please check your details.";
  }
  alert(errorMessage);
}
