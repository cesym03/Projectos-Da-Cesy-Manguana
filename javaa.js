// Import the functions you need from the SDKs you need
import { initializeApp, getDatabase } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCC2ONhTOSOCtIDuCnmtJJ3olNS7seF-CA",
  authDomain: "projecto-cz-gifts.firebaseapp.com",
  databaseURL: "https://projecto-cz-gifts-default-rtdb.firebaseio.com",
  projectId: "projecto-cz-gifts",
  storageBucket: "projecto-cz-gifts.firebasestorage.app",
  messagingSenderId: "368872869191",
  appId: "1:368872869191:web:04da4ff543360d3a8bd062",
};

// Initialize Firebase (consider error handling)
try {
  const app = initializeApp(firebaseConfig);
  console.log('Firebase app initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase:', error);
}

// Get a reference to the Realtime Database (consider offline capabilities)
const database = getDatabase(app);
const encomendaRef = database.ref('registarEncomenda'); // Using a descriptive variable name

document.getElementById("registarencomendaform").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault(); // Prevent default form submission behavior

  const clientName = getElementVal('clientName');
  const packageName = getElementVal('packageName');
  const clientContact = getElementVal('clientContact');
  const packageCost = parseFloat(getElementVal('packageCost')); // Ensure numeric value
  const advanceValue = parseFloat(getElementVal('advanceValue')); // Ensure numeric value
  const remainingValue = packageCost - advanceValue; // Calculate remaining value explicitly

  // Validate data before writing to Firebase (optional)
  // if (!validateData(clientName, packageName, clientContact, packageCost, advanceValue)) {
  //   return; // Handle invalid data
  // }

  const encomendaData = {
    clientName,
    packageName,
    clientContact,
    packageCost,
    advanceValue,
    remainingValue,
    // Add any other relevant data fields
  };

  // Write encomenda data to Firebase Realtime Database
  encomendaRef.push(encomendaData)
    .then((snapshot) => {
      console.log('Encomenda saved successfully:', snapshot.key);
      // Clear form or show success message to the user
    })
    .catch((error) => {
      console.error('Error saving encomenda:', error);
      // Handle errors appropriately (e.g., display error message to user)
    });
}

const getElementVal = (id) => {
  return document.getElementById(id).value;
}

// Optional validation function (replace with your validation logic)
function validateData(clientName, packageName, clientContact, packageCost, advanceValue) {
  // Implement your validation rules here
  // (e.g., check for empty fields, valid phone number format, etc.)
  return true; // Replace with appropriate return value based on validation
}