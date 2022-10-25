import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"


const app = firebase.initializeApp({
    apiKey: "AIzaSyAm4Zbd_nreZXw3ZIUZT7TOUK1HvBK55jE",
    authDomain: "freespace-b3ed2.firebaseapp.com",
    projectId: "freespace-b3ed2",
    storageBucket: "freespace-b3ed2.appspot.com",
    messagingSenderId: "211400567628",
    appId: "1:211400567628:web:4c3297366d9db3fcfffde9"
  });

// const firebaseApp = firebase.initializeApp(firebaseConfig)
const firestore=app.firestore();
const db={
    folders:firestore.collection('folders'),
    files:firestore.collection('files'),
    bin:firestore.collection('Trash'),
    fav:firestore.collection('Favourite'),
    getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
    formatDoc:doc => {
        return {id:doc.id, ...doc.data()}
    }
}
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider
export const storage = app.storage()  
export {db,auth,provider};
export default app