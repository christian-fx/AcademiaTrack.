// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC8Ecav2o0ZyeMph0k1yvNnaKEPzFzy7DA",
    authDomain: "academiatrack-app-2025.firebaseapp.com",
    databaseURL: "https://academiatrack-app-2025-default-rtdb.firebaseio.com",
    projectId: "academiatrack-app-2025",
    storageBucket: "academiatrack-app-2025.firebasestorage.app",
    messagingSenderId: "574483624184",
    appId: "1:574483624184:web:8f037934e27604fb0d0b0d"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

// Firebase utility functions
const firebaseUtils = {
    // Get current user data
    getCurrentUser: () => {
        return new Promise((resolve, reject) => {
            auth.onAuthStateChanged(user => {
                if (user) {
                    resolve(user);
                } else {
                    resolve(null);
                }
            });
        });
    },

    // Get user data from database
    getUserData: (userId) => {
        return database.ref('users/' + userId).once('value')
            .then(snapshot => snapshot.val());
    },

    // Save user data to database
    saveUserData: (userId, userData) => {
        return database.ref('users/' + userId).set(userData);
    },

    // Update user data
    updateUserData: (userId, updates) => {
        return database.ref('users/' + userId).update(updates);
    },

    // Get all users for statistics
    getAllUsers: () => {
        return database.ref('users').once('value')
            .then(snapshot => snapshot.val());
    },

    // Sign up user with email and password
    signUp: (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password);
    },

    // Sign in user with email and password
    signIn: (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);
    },

    // Send email verification
    sendEmailVerification: () => {
        return auth.currentUser.sendEmailVerification();
    },

    // Sign out user
    signOut: () => {
        return auth.signOut();
    },

    // Send password reset email
    sendPasswordReset: (email) => {
        return auth.sendPasswordResetEmail(email);
    }
};