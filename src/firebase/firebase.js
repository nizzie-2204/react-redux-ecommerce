import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyATV8khcK3urbYh0X0d3vPPp1FRCFhZzOg",
	authDomain: "react-redux-ecommerce-1c321.firebaseapp.com",
	projectId: "react-redux-ecommerce-1c321",
	storageBucket: "react-redux-ecommerce-1c321.appspot.com",
	messagingSenderId: "512801885872",
	appId: "1:512801885872:web:3dd8743b3dc40f1ad2f575",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebaseApp.auth();

export const db = firebase.firestore();

export const currentUser = auth.currentUser;
