import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBZki3HGBBy82HhfTTeyw0-AdDOfHrYqCo",
  authDomain: "crwndb-28e47.firebaseapp.com",
  databaseURL: "https://crwndb-28e47.firebaseio.com",
  projectId: "crwndb-28e47",
  storageBucket: "",
  messagingSenderId: "172416370190",
  appId: "1:172416370190:web:5d079c4881d462452a1e5f",
  measurementId: "G-JR2TBZN78L"
};
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    // is there data, if not create data
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
