import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyALagL8Wxy_qDABCJ9GmxyQ_TbCIZEA7io",
  authDomain: "royal1co.firebaseapp.com",
  databaseURL: "https://royal1co.firebaseio.com",
  projectId: "royal1co",
  storageBucket: "royal1co.appspot.com",
  messagingSenderId: "305335103189",
  appId: "1:305335103189:web:620efe03ad081d46867c5c",
  measurementId: "G-GFK50VV2MH"
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
